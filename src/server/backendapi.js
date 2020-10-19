"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
exports.__esModule = true;
// This sample assumes use of Express Node.js framework 
var axios = require('axios');
var CryptoJS = require('crypto-js');
// Store API keys in your environment configuration.
var YOUR_WYRE_API_KEY = 'AK-N8AW877C-4D2A3ZPH-4FPG6HW9-7ZTQ3G82';
var YOUR_WYRE_SECRET_KEY = '';
var productionUrl = "https://api.sendwyre.com/v3";
var testUrl = "https://api.testwyre.com/v3";
// Signature Calculation using Crypto-js
var signature = function (url, data) {
    var dataToSign = url + data;
    var token = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(dataToSign.toString(CryptoJS.enc.Utf8), YOUR_WYRE_SECRET_KEY));
    return token;
};
var BackendApi = /** @class */ (function () {
    function BackendApi() {
    }
    BackendApi.prototype.rateQuote = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var timestamp, url, headers, body, details, config, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        timestamp = new Date().getTime();
                        url = "https://api.testwyre.com/v3/orders/quote/partner?timestamp=" + timestamp;
                        headers = {};
                        body = {
                            amount: "100.75",
                            sourceCurrency: "USD",
                            destCurrency: "BTC",
                            dest: "bitcoin:1xxxxxxxxxxxxxxx",
                            country: "US",
                            accountId: "AC_28ZMELGWTUR",
                            walletType: "DEBIT_CARD"
                        };
                        details = JSON.stringify(body);
                        headers['Content-Type'] = 'application/json';
                        headers['X-Api-Key'] = YOUR_WYRE_API_KEY;
                        headers['X-Api-Signature'] = signature(url, details);
                        config = {
                            method: "POST",
                            url: url,
                            headers: headers,
                            data: details
                        };
                        console.log("**************NODE JS FINAL REQUEST***************", config);
                        return [4 /*yield*/, axios(config)];
                    case 1:
                        response = _a.sent();
                        res.send(response.data);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BackendApi.prototype.reserve = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var timestamp, url, headers, body, details, config, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        timestamp = new Date().getTime();
                        url = testUrl + "/orders/reserve";
                        headers = {};
                        body = {
                            referrerAccountId: "AC_28ZMELGWTUR"
                        };
                        details = JSON.stringify(body);
                        //headers['Authorization'] = 'Bearer'+ ' '+ YOUR_WYRE_API_KEY;
                        //headers['cache-control'] = 'no-cache';
                        headers['Content-Type'] = 'application/json';
                        headers['X-Api-Key'] = YOUR_WYRE_API_KEY;
                        headers['X-Api-Signature'] = signature(url, details);
                        config = {
                            method: "POST",
                            url: url,
                            headers: headers,
                            data: details
                        };
                        console.log("**************NODE JS FINAL REQUEST***************", config);
                        return [4 /*yield*/, axios(config)];
                    case 1:
                        response = _a.sent();
                        console.log("**************AXIOS***************", response);
                        res.send(response.data);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return BackendApi;
}());
exports.BackendApi = BackendApi;
function createWireToken() {
    var date = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (date + Math.random() * 16) % 16 | 0;
        date = Math.floor(date / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
