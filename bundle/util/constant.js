"use strict";
// ffmpeg -f image2 -i /home/ttwang/images/image%d.jpg tt.mp4                              基本格式
// ffmpeg -f image2 -i /home/ttwang/images/image%d.jpg  -vcodec libx264  tt.mp4            指定编码格式的使用
// ffmpeg -f image2 -i /home/ttwang/images/image%d.jpg  -vcodec libx264 -r 10  tt.mp4      指定输出帧率
// -threads 2：以两个线程进行运行， 加快处理的速度。
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESPONSE_LOG_PATH = exports.NETWORK_LOG_PATH = exports.NETWORK_ERROR_LOG_PATH = exports.JS_LOG_PATH = exports.JS_ERROR_LOG_PATH = exports.BASE_PATH = exports.IMAGE_TEMP_DIR = exports.COMMAND = void 0;
exports.COMMAND = '';
exports.IMAGE_TEMP_DIR = '/Users/ashes/Desktop/back-end/jdv-listener/tempAsset/';
exports.BASE_PATH = '/app/tempAsset/';
// export const BASE_PATH = '/Users/dushihua2/Desktop/back-and/jdvlistener/tempAsset';
// export const BASE_PATH = 'D:/back-end/jdvlistener/tempAsset';
var JS_ERROR_LOG_PATH = function (date) { return exports.BASE_PATH + "/" + date + "/js_error.log"; };
exports.JS_ERROR_LOG_PATH = JS_ERROR_LOG_PATH;
var JS_LOG_PATH = function (date) { return exports.BASE_PATH + "/" + date + "/js_access.log"; };
exports.JS_LOG_PATH = JS_LOG_PATH;
var NETWORK_ERROR_LOG_PATH = function (date) { return exports.BASE_PATH + "/" + date + "/network_error.log"; };
exports.NETWORK_ERROR_LOG_PATH = NETWORK_ERROR_LOG_PATH;
var NETWORK_LOG_PATH = function (date) { return exports.BASE_PATH + "/" + date + "/network_access.log"; };
exports.NETWORK_LOG_PATH = NETWORK_LOG_PATH;
var RESPONSE_LOG_PATH = function (date) { return exports.BASE_PATH + "/" + date + "/network_response.log"; };
exports.RESPONSE_LOG_PATH = RESPONSE_LOG_PATH;
//# sourceMappingURL=constant.js.map