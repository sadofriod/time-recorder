import { isDev, JS_ERROR_LOG_PATH, JS_LOG_PATH, NETWORK_LOG_PATH, NETWORK_SOURCE_PATH } from './constant';
import * as fs from 'fs';
import * as puppeteer from 'puppeteer';
import { ConsoleMessage, PageEventObj, Request } from 'puppeteer';

type CustomStream = string | fs.WriteStream;
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

const sumContent = (stream: CustomStream, content: string) => {
  if (typeof stream === 'string') {
    stream += `\n${content}`;
  } else {
    stream.write(content);
  }
};

const consoleAnalyze = (chunk: ConsoleMessage, stream: CustomStream) => {
  sumContent(stream, chunk.text());
};

const networkAnalyze = async (chunk: Request, stream: CustomStream) => {
  const res = chunk.response();
  if (!res) {
    return;
  }
  if (chunk.resourceType() === 'xhr') {
    try {
      const json = (await res.json()) || 'no response';
      sumContent(stream, JSON.stringify(json));
    } catch (error) {
      const text = await res.text();
      sumContent(stream, text);
    }
  } else {
    const text = await res.text();
    sumContent(stream, text);
  }
};
const errorAnalyze = (chunk: Error, stream: CustomStream) => {
  sumContent(stream, chunk.message);
};

const contentAnalyze = (type: keyof PageEventObj, chunk: ConsoleMessage | Request | Error, stream: CustomStream) => {
  switch (type) {
    case 'requestfinished' || 'requestfailed':
      networkAnalyze(chunk as Request, stream);
      break;
    case 'console':
      consoleAnalyze(chunk as ConsoleMessage, stream);
      break;
    default:
      errorAnalyze(chunk as Error, stream);
  }
};

export const startLogRecorder = async (key: string, page: puppeteer.Page) => {
  const pageerrorWriteStream = isDev
    ? fs.createWriteStream(JS_ERROR_LOG_PATH(key), { flags: 'a', autoClose: false, encoding: 'utf-8' })
    : '';
  const requestfinishedWriteStream = isDev
    ? fs.createWriteStream(NETWORK_LOG_PATH(key), { flags: 'a', autoClose: false, encoding: 'utf-8' })
    : '';
  const consoleWriteStream = isDev
    ? fs.createWriteStream(JS_LOG_PATH(key), { flags: 'a', autoClose: false, encoding: 'utf-8' })
    : '';

  const sourceWriteStream = isDev
    ? fs.createWriteStream(NETWORK_SOURCE_PATH(key), { flags: 'a', autoClose: false, encoding: 'utf-8' })
    : '';

  logs.setLog<fs.WriteStream>(key, {
    jsError: pageerrorWriteStream,
    jsLog: consoleWriteStream,
    networkLog: requestfinishedWriteStream,
  });
  page.on('requestfinished', (chunk) => contentAnalyze('requestfinished', chunk, requestfinishedWriteStream));
  page.on('requestfinished', (chunk) => contentAnalyze('requestfinished', chunk, sourceWriteStream));
  page.on('console', (chunk) => contentAnalyze('console', chunk, requestfinishedWriteStream));
  page.on('pageerror', (chunk) => contentAnalyze('pageerror', chunk, requestfinishedWriteStream));
};

export const stopLogRecorder = async (key: string, page: puppeteer.Page) => {
  const log = logs.getLog(key);
  const { jsError, jsLog, networkLog } = log;
  page.removeAllListeners();
  if (!(typeof jsError === 'string')) {
    jsError.close();
  }
  if (!(typeof jsLog === 'string')) {
    jsLog.close();
  }
  if (!(typeof networkLog === 'string')) {
    networkLog.close();
  }
};

export default logs;
