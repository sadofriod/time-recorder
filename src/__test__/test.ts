import * as Xvfb from 'xvfb';
import { spawn } from 'child_process';
import * as puppeteer from 'puppeteer';

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

async function main(width = 4800, height = 2160, cookies = {}) {
  const xvfb = new Xvfb({
    silent: true,
    xvfb_args: ['-screen', '0', `${4800}x${2160}x24`, '-ac'],
    displayNum: 3000,
  });
  try {
    xvfb.startSync();
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
        '--start-fullscreen',
        '--display=' + xvfb._display,
        '--disable-setuid-sandbox',
        '-–disable-dev-shm-usage',
        '-–no-first-run', //没有设置首页。
        '–-single-process', //单进程运行
        '--disable-gpu', //GPU硬件加速
        `--window-size=${width},${height}`,
      ],
    });
    const page = await browser.newPage();
    await page.setViewport({
      width: width,
      height: height,
    });
    await page.setCookie(...converntCookie(cookies));
    await page.goto('https://jdvision.jd.com/jdv/view?id=1798');
    xvfb.stopSync();
  } catch (error) {
    console.log(error);
    xvfb.stopSync();
  }
}
