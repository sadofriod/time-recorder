"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openUrls = void 0;
var puppeteer = require("puppeteer");
// import { IMAGE_TEMP_DIR } from './constant';
// import getUserMedia from './getUserMedia';
var child_process_1 = require("child_process");
var Xvfb = require("xvfb");
var fs = require("fs");
// import * as uuid from 'uuid';
var constant_1 = require("./constant");
var converntCookie = function (cookie) {
    var keys = Object.keys(cookie);
    var result = [];
    keys.forEach(function (item) {
        result.push({ name: item, value: cookie[item], url: 'http://.jd.com' });
        if (item === 'rememberMe') {
            result.push({ name: item, value: cookie[item], url: 'http://ssjdv.jd.com' });
        }
    });
    return result;
};
var openUrls = function (options, cookies, job, date) { return __awaiter(void 0, void 0, void 0, function () {
    var size, url, second, width, height, xvfb, browser, page, ffmpeg, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(options);
                size = options.size, url = options.url, second = options.second;
                width = size.width, height = size.height;
                xvfb = new Xvfb({
                    silent: true,
                    xvfb_args: ['-screen', '0', width + "x" + height + "x24", '-ac'],
                });
                console.log(xvfb._display);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 12, , 13]);
                xvfb.startSync();
                return [4 /*yield*/, puppeteer.launch({
                        headless: false,
                        executablePath: '/usr/bin/google-chrome',
                        // executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
                        // executablePath: '/Applic',
                        defaultViewport: null,
                        args: [
                            '--enable-usermedia-screen-capturing',
                            "--auto-select-desktop-capture-source=recorder-page",
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
                            '-–no-first-run',
                            '–-single-process',
                            '--disable-gpu',
                            "--window-size=" + width + "," + height,
                        ],
                    })];
            case 2:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 3:
                page = _a.sent();
                return [4 /*yield*/, page.setDefaultNavigationTimeout(0)];
            case 4:
                _a.sent();
                return [4 /*yield*/, page.setCookie.apply(page, converntCookie(cookies))];
            case 5:
                _a.sent();
                return [4 /*yield*/, page.setViewport({
                        width: width,
                        height: height,
                    })];
            case 6:
                _a.sent();
                fs.mkdirSync(constant_1.BASE_PATH + "/" + date);
                // const pageerrorWriteStream = fs.createWriteStream(JS_ERROR_LOG_PATH(date), { flags: 'a', autoClose: false });
                // const requestfinishedWriteStream = fs.createWriteStream(NETWORK_LOG_PATH(date), { flags: 'a', autoClose: false });
                // const consoleWriteStream = fs.createWriteStream(JS_LOG_PATH(date), { flags: 'a', autoClose: false });
                return [4 /*yield*/, page.goto(url)];
            case 7:
                // const pageerrorWriteStream = fs.createWriteStream(JS_ERROR_LOG_PATH(date), { flags: 'a', autoClose: false });
                // const requestfinishedWriteStream = fs.createWriteStream(NETWORK_LOG_PATH(date), { flags: 'a', autoClose: false });
                // const consoleWriteStream = fs.createWriteStream(JS_LOG_PATH(date), { flags: 'a', autoClose: false });
                _a.sent();
                return [4 /*yield*/, page.setBypassCSP(true)];
            case 8:
                _a.sent();
                console.log(xvfb._display);
                page.waitForSelector('div');
                return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 20000); })];
            case 9:
                _a.sent();
                ffmpeg = child_process_1.spawn('ffmpeg', [
                    '-r',
                    '24',
                    // '-framerate 30',
                    '-f',
                    'x11grab',
                    '-s',
                    width + "x" + height,
                    '-i',
                    xvfb._display,
                    '-c:v',
                    'libvpx',
                    '-quality',
                    'realtime',
                    '-cpu-used',
                    '0',
                    // '-b:v',
                    // '384k',
                    '-qmin',
                    '10',
                    '-qmax',
                    '42',
                    '-maxrate',
                    '384k',
                    // '-bufsize',
                    // '1024k',
                    '-an',
                    constant_1.BASE_PATH + "/" + date + "/screen.webm",
                ]);
                // ffmpeg.kill(ffmpeg.pid)
                // await page.waitForSelector('body');
                // if (index === 9) {
                // getUserMedia(page, sec, date);
                // }
                // page.on('pageerror', async function (err) {
                //   if (err) {
                //     try {
                //       // await streamEvent('open');
                //       pageerrorWriteStream.write(`${new Date().toISOString()} - ${err.message}\n`);
                //     } catch (error) {
                //       console.log(' page error WriteStream Error :', error);
                //     }
                //   }
                // });
                // page.on('requestfinished', async function (req) {
                //   const res = req.response();
                //   let body: any = '';
                //   if (res) {
                //     try {
                //       body = await res.json();
                //       const result = {
                //         url: req.url(),
                //         status: res.status(),
                //         header: req.headers(),
                //         response: body,
                //       };
                //       // const streamEvent = promisify(requestfinishedWriteStream.on);
                //       requestfinishedWriteStream.write(`${new Date().toISOString()} - ${JSON.stringify(result, null, 2)}\n`);
                //     } catch (error) {
                //       body = await res.text();
                //       // }
                //       // console.log('request finished WriteStream Error :', error);
                //     }
                //   }
                // });
                // page.on('console', async (message) => {
                //   const args = await message.args();
                //   args.forEach(async (arg: any) => {
                //     try {
                //       const val = await arg.jsonValue();
                //       // consoleWriteStream.write(`${JSON.stringify(val)}\n`);
                //     } catch (error) {
                //       console.log('console WriteStream Error :', error);
                //     }
                //   });
                // });
                // await page.waitForFunction(
                //   () => {
                //     const newWindow: {
                //       recorderVedio?(stream: any): any;
                //       _autoScroderIsDone?: string;
                //     } & typeof window = window;
                //     console.log(newWindow._autoScroderIsDone);
                //     const showDate = new Date();
                //     console.log('recorder time: ' + showDate.getMinutes() + ':' + showDate.getSeconds());
                //     return !!newWindow._autoScroderIsDone;
                //   },
                //   { timeout: 0 }
                // );
                return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, second); })];
            case 10:
                // ffmpeg.kill(ffmpeg.pid)
                // await page.waitForSelector('body');
                // if (index === 9) {
                // getUserMedia(page, sec, date);
                // }
                // page.on('pageerror', async function (err) {
                //   if (err) {
                //     try {
                //       // await streamEvent('open');
                //       pageerrorWriteStream.write(`${new Date().toISOString()} - ${err.message}\n`);
                //     } catch (error) {
                //       console.log(' page error WriteStream Error :', error);
                //     }
                //   }
                // });
                // page.on('requestfinished', async function (req) {
                //   const res = req.response();
                //   let body: any = '';
                //   if (res) {
                //     try {
                //       body = await res.json();
                //       const result = {
                //         url: req.url(),
                //         status: res.status(),
                //         header: req.headers(),
                //         response: body,
                //       };
                //       // const streamEvent = promisify(requestfinishedWriteStream.on);
                //       requestfinishedWriteStream.write(`${new Date().toISOString()} - ${JSON.stringify(result, null, 2)}\n`);
                //     } catch (error) {
                //       body = await res.text();
                //       // }
                //       // console.log('request finished WriteStream Error :', error);
                //     }
                //   }
                // });
                // page.on('console', async (message) => {
                //   const args = await message.args();
                //   args.forEach(async (arg: any) => {
                //     try {
                //       const val = await arg.jsonValue();
                //       // consoleWriteStream.write(`${JSON.stringify(val)}\n`);
                //     } catch (error) {
                //       console.log('console WriteStream Error :', error);
                //     }
                //   });
                // });
                // await page.waitForFunction(
                //   () => {
                //     const newWindow: {
                //       recorderVedio?(stream: any): any;
                //       _autoScroderIsDone?: string;
                //     } & typeof window = window;
                //     console.log(newWindow._autoScroderIsDone);
                //     const showDate = new Date();
                //     console.log('recorder time: ' + showDate.getMinutes() + ':' + showDate.getSeconds());
                //     return !!newWindow._autoScroderIsDone;
                //   },
                //   { timeout: 0 }
                // );
                _a.sent();
                ffmpeg.kill();
                // pageerrorWriteStream.close();
                // requestfinishedWriteStream.close();
                // consoleWriteStream.close();
                return [4 /*yield*/, browser.close()];
            case 11:
                // pageerrorWriteStream.close();
                // requestfinishedWriteStream.close();
                // consoleWriteStream.close();
                _a.sent();
                xvfb.stopSync();
                job.stop();
                return [3 /*break*/, 13];
            case 12:
                error_1 = _a.sent();
                console.log('process error----', error_1);
                xvfb.stopSync();
                return [3 /*break*/, 13];
            case 13: return [2 /*return*/];
        }
    });
}); };
exports.openUrls = openUrls;
//# sourceMappingURL=puppeteer.js.map