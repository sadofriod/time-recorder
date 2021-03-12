import * as puppeteer from 'puppeteer';
import { ImageOption } from 'types';
// import { IMAGE_TEMP_DIR } from './constant';
import getUserMedia from './getUserMedia';
// import * as Xvfb from 'xvfb';
import * as fs from 'fs';
import * as uuid from 'uuid';
import {
  BASE_PATH,
  JS_ERROR_LOG_PATH,
  JS_LOG_PATH,
  // NETWORK_ERROR_LOG_PATH,
  NETWORK_LOG_PATH,
  // RESPONSE_LOG_PATH,
} from './constant';
import { CronJob } from 'cron';

const converntCookie = (cookie: any) => {
  const keys = Object.keys(cookie);
  const result: puppeteer.SetCookie[] = [];
  keys.forEach((item) => {
    result.push({ name: item, value: cookie[item], url: 'http://.jd.com' });

    if (item === 'rememberMe') {
      result.push({ name: item, value: cookie[item], url: 'http://ssjdv.jd.com' });
    }
  });
  return result;
};

interface Options extends Omit<ImageOption, 'url'> {
  url: string;
}

export const openUrls = async (options: Options, cookies: puppeteer.SetCookie, job: CronJob) => {
  console.log(options);

  const { size, url, second } = options;
  const { width, height } = size;
  const sec = second ? second * 1000 : 60000;

  // const xvfb = new Xvfb({ silent: true, xvfb_args: ['-screen', '0', `${width}x${height}x24`, '-ac'] });
  try {
    // xvfb.startSync();
    const browser = await puppeteer.launch({
      headless: false,
      // executablePath: '/usr/bin/google-chrome',
      executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      defaultViewport: null,
      args: [
        '--enable-usermedia-screen-capturing',
        `--auto-select-desktop-capture-source=recorder-page`,
        '--allow-http-screen-capture',
        '--ignore-certificate-errors',
        '--enable-experimental-web-platform-features',
        '--allow-http-screen-capture',
        '--disable-infobars',
        '--no-sandbox',
        '--start-fullscreen',
        // '--display=' + xvfb._display,
        '--disable-setuid-sandbox',
        '-–disable-dev-shm-usage',
        '-–no-first-run', //没有设置首页。
        // '–-single-process', //单进程运行
        '--disable-gpu', //GPU硬件加速
        `--window-size=${width},${height}`,
      ],
    });
    // const pages = await browser.pages();
    // await browser.newPage();
    // await browser.newPage();
    // const page = pages[0];
    // await page._client.send('Emulation.clearDeviceMetricsOverride');
    // console.log(pages.length);
    const pages = [
      await browser.newPage(),
      await browser.newPage(),
      await browser.newPage(),
      await browser.newPage(),
      await browser.newPage(),
      await browser.newPage(),
      await browser.newPage(),
      await browser.newPage(),
      await browser.newPage(),
      await browser.newPage(),
    ];
    pages.forEach(async (page, index) => {
      const date = uuid.v4();
      await page.setDefaultNavigationTimeout(0);
      await page.setCookie(...converntCookie(cookies));
      await page.setViewport({
        width: width,
        height: height,
      });
      // await page._client.send('Emulation.clearDeviceMetricsOverride')
      fs.mkdirSync(`${BASE_PATH}/${date}`);
      const pageerrorWriteStream = fs.createWriteStream(JS_ERROR_LOG_PATH(date), { flags: 'a', autoClose: false });
      // const requestfailedWriteStream = fs.createWriteStream(NETWORK_ERROR_LOG_PATH(date), { flags: 'a' });
      const requestfinishedWriteStream = fs.createWriteStream(NETWORK_LOG_PATH(date), { flags: 'a', autoClose: false });
      const consoleWriteStream = fs.createWriteStream(JS_LOG_PATH(date), { flags: 'a', autoClose: false });
      // const responseWriteStrem = fs.createWriteStream(RESPONSE_LOG_PATH(date), { flags: 'a' });
      await page.goto(url);
      await page.setBypassCSP(true);
      await page.waitForSelector('body');
      // if (index === 9) {
      getUserMedia(page, sec, date);
      // }
      page.on('pageerror', async function (err) {
        if (err) {
          try {
            // await streamEvent('open');
            pageerrorWriteStream.write(`${new Date().toISOString()} - ${err.message}\n`);
          } catch (error) {
            console.log(' page error WriteStream Error :', error);
          }
        }
      });

      page.on('requestfinished', async function (req) {
        const res = req.response();
        let body: any = '';
        if (res) {
          try {
            body = await res.json();
            const result = {
              url: req.url(),
              status: res.status(),
              header: req.headers(),
              response: body,
            };
            // const streamEvent = promisify(requestfinishedWriteStream.on);
            requestfinishedWriteStream.write(`${new Date().toISOString()} - ${JSON.stringify(result, null, 2)}\n`);
          } catch (error) {
            // body = await res.text();
            // }
            // console.log('request finished WriteStream Error :', error);
          }
        }
      });

      page.on('console', async (message) => {
        const args = await message.args();
        args.forEach(async (arg: any) => {
          try {
            const val = await arg.jsonValue();
            consoleWriteStream.write(`${JSON.stringify(val)}\n`);
          } catch (error) {
            console.log('console WriteStream Error :', error);
          }
        });
      });

      await page.waitForFunction(
        () => {
          const newWindow: {
            recorderVedio?(stream: any): any;
            _autoScroderIsDone?: string;
          } & typeof window = window;
          console.log(newWindow._autoScroderIsDone);
          const showDate = new Date();
          console.log('recorder time: ' + showDate.getMinutes() + ':' + showDate.getSeconds());
          return !!newWindow._autoScroderIsDone;
        },
        { timeout: 0 }
      );

      pageerrorWriteStream.close();
      // requestfailedWriteStream.close();
      requestfinishedWriteStream.close();
      consoleWriteStream.close();
      job.stop();
      if (index === 9) {
        await browser.close();
      }
    });

    // xvfb.stopSync();
  } catch (error) {
    console.log(error);
    // xvfb.stopSync();
  }
};
