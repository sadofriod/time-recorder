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
var getUserMedia_1 = require("./getUserMedia");
// import * as Xvfb from 'xvfb';
var fs = require("fs");
var uuid = require("uuid");
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
var openUrls = function (options, cookies, job) { return __awaiter(void 0, void 0, void 0, function () {
    var size, url, second, width, height, sec, browser_1, pages, _a, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log(options);
                size = options.size, url = options.url, second = options.second;
                width = size.width, height = size.height;
                sec = second ? second * 1000 : 60000;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 13, , 14]);
                return [4 /*yield*/, puppeteer.launch({
                        headless: false,
                        // executablePath: '/usr/bin/google-chrome',
                        executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
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
                            // '--display=' + xvfb._display,
                            '--disable-setuid-sandbox',
                            '-–disable-dev-shm-usage',
                            '-–no-first-run',
                            // '–-single-process', //单进程运行
                            '--disable-gpu',
                            "--window-size=" + width + "," + height,
                        ],
                    })];
            case 2:
                browser_1 = _b.sent();
                return [4 /*yield*/, browser_1.newPage()];
            case 3:
                _a = [
                    _b.sent()
                ];
                return [4 /*yield*/, browser_1.newPage()];
            case 4:
                _a = _a.concat([
                    _b.sent()
                ]);
                return [4 /*yield*/, browser_1.newPage()];
            case 5:
                _a = _a.concat([
                    _b.sent()
                ]);
                return [4 /*yield*/, browser_1.newPage()];
            case 6:
                _a = _a.concat([
                    _b.sent()
                ]);
                return [4 /*yield*/, browser_1.newPage()];
            case 7:
                _a = _a.concat([
                    _b.sent()
                ]);
                return [4 /*yield*/, browser_1.newPage()];
            case 8:
                _a = _a.concat([
                    _b.sent()
                ]);
                return [4 /*yield*/, browser_1.newPage()];
            case 9:
                _a = _a.concat([
                    _b.sent()
                ]);
                return [4 /*yield*/, browser_1.newPage()];
            case 10:
                _a = _a.concat([
                    _b.sent()
                ]);
                return [4 /*yield*/, browser_1.newPage()];
            case 11:
                _a = _a.concat([
                    _b.sent()
                ]);
                return [4 /*yield*/, browser_1.newPage()];
            case 12:
                pages = _a.concat([
                    _b.sent()
                ]);
                pages.forEach(function (page, index) { return __awaiter(void 0, void 0, void 0, function () {
                    var date, pageerrorWriteStream, requestfinishedWriteStream, consoleWriteStream;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                date = uuid.v4();
                                return [4 /*yield*/, page.setDefaultNavigationTimeout(0)];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, page.setCookie.apply(page, converntCookie(cookies))];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, page.setViewport({
                                        width: width,
                                        height: height,
                                    })];
                            case 3:
                                _a.sent();
                                // await page._client.send('Emulation.clearDeviceMetricsOverride')
                                fs.mkdirSync(constant_1.BASE_PATH + "/" + date);
                                pageerrorWriteStream = fs.createWriteStream(constant_1.JS_ERROR_LOG_PATH(date), { flags: 'a', autoClose: false });
                                requestfinishedWriteStream = fs.createWriteStream(constant_1.NETWORK_LOG_PATH(date), { flags: 'a', autoClose: false });
                                consoleWriteStream = fs.createWriteStream(constant_1.JS_LOG_PATH(date), { flags: 'a', autoClose: false });
                                // const responseWriteStrem = fs.createWriteStream(RESPONSE_LOG_PATH(date), { flags: 'a' });
                                return [4 /*yield*/, page.goto(url)];
                            case 4:
                                // const responseWriteStrem = fs.createWriteStream(RESPONSE_LOG_PATH(date), { flags: 'a' });
                                _a.sent();
                                return [4 /*yield*/, page.setBypassCSP(true)];
                            case 5:
                                _a.sent();
                                return [4 /*yield*/, page.waitForSelector('body')];
                            case 6:
                                _a.sent();
                                // if (index === 9) {
                                getUserMedia_1.default(page, sec, date);
                                // }
                                page.on('pageerror', function (err) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            if (err) {
                                                try {
                                                    // await streamEvent('open');
                                                    pageerrorWriteStream.write(new Date().toISOString() + " - " + err.message + "\n");
                                                }
                                                catch (error) {
                                                    console.log(' page error WriteStream Error :', error);
                                                }
                                            }
                                            return [2 /*return*/];
                                        });
                                    });
                                });
                                page.on('requestfinished', function (req) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var res, body, result, error_2;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    res = req.response();
                                                    body = '';
                                                    if (!res) return [3 /*break*/, 4];
                                                    _a.label = 1;
                                                case 1:
                                                    _a.trys.push([1, 3, , 4]);
                                                    return [4 /*yield*/, res.json()];
                                                case 2:
                                                    body = _a.sent();
                                                    result = {
                                                        url: req.url(),
                                                        status: res.status(),
                                                        header: req.headers(),
                                                        response: body,
                                                    };
                                                    // const streamEvent = promisify(requestfinishedWriteStream.on);
                                                    requestfinishedWriteStream.write(new Date().toISOString() + " - " + JSON.stringify(result, null, 2) + "\n");
                                                    return [3 /*break*/, 4];
                                                case 3:
                                                    error_2 = _a.sent();
                                                    return [3 /*break*/, 4];
                                                case 4: return [2 /*return*/];
                                            }
                                        });
                                    });
                                });
                                page.on('console', function (message) { return __awaiter(void 0, void 0, void 0, function () {
                                    var args;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, message.args()];
                                            case 1:
                                                args = _a.sent();
                                                args.forEach(function (arg) { return __awaiter(void 0, void 0, void 0, function () {
                                                    var val, error_3;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                _a.trys.push([0, 2, , 3]);
                                                                return [4 /*yield*/, arg.jsonValue()];
                                                            case 1:
                                                                val = _a.sent();
                                                                consoleWriteStream.write(JSON.stringify(val) + "\n");
                                                                return [3 /*break*/, 3];
                                                            case 2:
                                                                error_3 = _a.sent();
                                                                console.log('console WriteStream Error :', error_3);
                                                                return [3 /*break*/, 3];
                                                            case 3: return [2 /*return*/];
                                                        }
                                                    });
                                                }); });
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                                return [4 /*yield*/, page.waitForFunction(function () {
                                        var newWindow = window;
                                        console.log(newWindow._autoScroderIsDone);
                                        var showDate = new Date();
                                        console.log('recorder time: ' + showDate.getMinutes() + ':' + showDate.getSeconds());
                                        return !!newWindow._autoScroderIsDone;
                                    }, { timeout: 0 })];
                            case 7:
                                _a.sent();
                                pageerrorWriteStream.close();
                                // requestfailedWriteStream.close();
                                requestfinishedWriteStream.close();
                                consoleWriteStream.close();
                                job.stop();
                                if (!(index === 9)) return [3 /*break*/, 9];
                                return [4 /*yield*/, browser_1.close()];
                            case 8:
                                _a.sent();
                                _a.label = 9;
                            case 9: return [2 /*return*/];
                        }
                    });
                }); });
                return [3 /*break*/, 14];
            case 13:
                error_1 = _b.sent();
                console.log(error_1);
                return [3 /*break*/, 14];
            case 14: return [2 /*return*/];
        }
    });
}); };
exports.openUrls = openUrls;
//# sourceMappingURL=puppeteer.js.map