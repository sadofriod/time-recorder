import * as puppeteer from 'puppeteer';
import { ImageOption } from 'types';
import { spawn } from 'child_process';
// import * as Xvfb from 'xvfb';
import { BASE_PATH } from './constant';
import { CronJob } from 'cron';
import { xvfbStart, xvfbStop } from './xvfb';
import * as fs from 'fs';
import { ffmpegStop, startCapture } from './ffmpeg';

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

export const openUrls = async (options: Options, cookies: puppeteer.SetCookie, job: CronJob, date: string) => {
  // console.log(options);

  const { size, url, second } = options;
  const { width, height } = size;
  // const sec = second ? second : 60000;

  // const xvfb = new Xvfb({
  //   silent: true,
  //   xvfb_args: ['-screen', '0', `${width}x${height}x24`, '-ac'],
  // });
  // console.log(xvfb._display);

  try {
    // xvfb.startSync();
    const display = await xvfbStart(date, {
      width,
      height,
      depth: 16,
    });
    // console.log(display);

    const browser = await puppeteer.launch({
      headless: false,
      executablePath: '/usr/bin/google-chrome',
      // executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      // executablePath: '/Applic',
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
        '--disable-setuid-sandbox',
        '--start-fullscreen',
        '--display=:' + display,
        '-–disable-dev-shm-usage',
        '-–no-first-run', //没有设置首页。
        '–-single-process', //单进程运行
        '--disable-gpu', //GPU硬件加速
        `--window-size=${width},${height}`,
      ],
    });
    const page = await browser.newPage();

    await page.setDefaultNavigationTimeout(0);
    await page.setCookie(...converntCookie(cookies));
    await page.setViewport({
      width: width,
      height: height,
    });

    await page.goto(url);
    await page.setBypassCSP(true);
    // console.log(xvfb._display);
    page.waitForSelector('div');
    // await new Promise((r) => setTimeout(r, 20000));
    fs.mkdirSync(`${BASE_PATH}${date}`);
    // let count = 0;
    startCapture(date, display, {
      width,
      height,
      framerate: 30,
    });
    await new Promise((r) => setTimeout(r, second as number));
    // await new Promise((R) => {
    //   setInterval(() => {
    //     if (second && count <= second) {
    //       startCapture(date, display, {
    //         width,
    //         height,
    //         framerate: 30,
    //       });
    //       count++;
    //     } else {
    //       R('done');
    //     }
    //   }, 1000);
    // });
    ffmpegStop(date);
    await browser.close();
    await xvfbStop(date);
    job.stop();
  } catch (error) {
    console.log('process error----', error);
    // await browser.close();
    await xvfbStop(date);
    job.stop();
  }
};
