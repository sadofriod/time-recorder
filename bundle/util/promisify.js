"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var promisify = function (asyncFucntion) {
    return function () {
        var asyncFunctionParam = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            asyncFunctionParam[_i] = arguments[_i];
        }
        return new Promise(function (res, rej) {
            var tempCallBack = function () {
                var arg = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    arg[_i] = arguments[_i];
                }
                if (arg.length > 0) {
                    res.apply(void 0, arg);
                }
            };
            asyncFucntion.apply(void 0, __spreadArrays(asyncFunctionParam, [tempCallBack]));
        });
    };
};
exports.default = promisify;
//# sourceMappingURL=promisify.js.map