import {
  BASE_PATH,
  isDev,
  JS_ERROR_LOG_PATH,
  JS_LOG_PATH,
  // NETWORK_ERROR_LOG_PATH,
  NETWORK_LOG_PATH,
  // RESPONSE_LOG_PATH,
} from './constant';
import * as fs from 'fs';
import * as puppeteer from 'puppeteer';
import * as util from 'util';
import { PageEventObj } from 'puppeteer';

interface LogSetItem<ITEMTYPE> {
  jsError: string | fs.WriteStream;
  jsLog: string | fs.WriteStream;
  networkLog: string | fs.WriteStream;
}

interface LogSet<T = string | fs.WriteStream> {
  [key: string]: LogSetItem<T>;
}

class Logs {
  private logs: LogSet = {};

  setLog = <T>(key: string, option: LogSetItem<T>) => {
    this.logs[key] = option;
  };

  getLogs = () => this.logs;

  getLog = <T>(key: string): LogSetItem<T> => this.logs[key];
}

const logs = new Logs();

export const startRecorder = async (key: string, page: puppeteer.Page) => {
  const pageAsync = util.promisify(page.on);

  const pageError = (await pageAsync('pageerror')) as PageEventObj['pageerror'];
  const jsLog = (await pageAsync('console')) as PageEventObj['console'];
  const network = (await pageAsync('requestfinished')) as PageEventObj['requestfinished'];
  const networkEorror = (await pageAsync('requestfailed')) as PageEventObj['requestfailed'];

  if (isDev) {
    fs.mkdirSync(`${BASE_PATH}/${key}`);
    const pageerrorWriteStream = fs.createWriteStream(JS_ERROR_LOG_PATH(key), { flags: 'a', autoClose: false });
    const requestfinishedWriteStream = fs.createWriteStream(NETWORK_LOG_PATH(key), { flags: 'a', autoClose: false });
    const consoleWriteStream = fs.createWriteStream(JS_LOG_PATH(key), { flags: 'a', autoClose: false });
    logs.setLog<fs.WriteStream>(key, {
      jsError: pageerrorWriteStream,
      jsLog: consoleWriteStream,
      networkLog: requestfinishedWriteStream,
    });
    pageerrorWriteStream.write(pageError.message);
    consoleWriteStream.write(jsLog.text());
    const errorReq = networkEorror.response();
    const error = errorReq ? errorReq.url() + ' _ ' + errorReq.remoteAddress() : 'response has error';
    requestfinishedWriteStream.write(error);
    const finishReq = network.response();
    try {
      const finish = finishReq ? await finishReq.json() : 'response is empty';
      requestfinishedWriteStream.write(finish);
    } catch (error) {
      requestfinishedWriteStream.write(finishReq ? finishReq.text() : 'response is empty');
      console.log(error);
    }
  } else {
    // const pageErrorStr = logs.getLog<string>(key).jsError
    // const networkStr = logs.getLog<string>(key).networkLog
    // const jsLog = logs.getLog<string>(key).jsLog
  }
};

export default logs;
