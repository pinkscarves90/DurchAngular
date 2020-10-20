import * as express from 'express';
// This sample assumes use of Express Node.js framework 
const axios = require('axios');
const CryptoJS = require('crypto-js');

// Store API keys in your environment configuration.
const WYRE_APIKEY = 'AK-9W8LQ7YH-GZGPLRN6-TXURQX6P-E9BD7B7Y';
const WYRE_TOKEN = createWireToken();
const secretKey = JSON.stringify({ "secretKey": createWireToken() });
const accountId = 'AC_CEGT949D3Z6'
const productionUrl = "https://api.sendwyre.com/v3";
const testUrl = "https://api.testwyre.com/v3"

// Signature Calculation using Crypto-js
// function calcAuthSigHash(url_body) {
//     let hash = CryptoJS.HmacSHA256(url_body, WYRE_TOKEN);
//     return CryptoJS.enc.Hex.stringify(hash);
// }

const calcAuthSigHash = (dataToSign) => {
    const token = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(dataToSign.toString(CryptoJS.enc.Utf8), WYRE_TOKEN));
    return token;
}
function createWireToken() {
    let date = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (date + Math.random() * 16) % 16 | 0;
        date = Math.floor(date / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
export class BackendApi {
    async rateQuote(req, res, next) {
        try {
            const timestamp = new Date().getTime();
            const url = `https://api.testwyre.com/v3/orders/quote/partner?timestamp=${timestamp}`;
            const headers = {};
            const body = {
                amount: "100.75",
                sourceCurrency: "USD",
                destCurrency: "BTC",
                dest: "bitcoin:1xxxxxxxxxxxxxxx",
                country: "US",
                accountId: "AC_28ZMELGWTUR",
                walletType: "DEBIT_CARD"
            }
            const details = JSON.stringify(body);

            headers['Content-Type'] = 'application/json';
            headers['X-Api-Key'] = WYRE_APIKEY;
            headers['X-Api-Signature'] = calcAuthSigHash(url + details);

            const request = {
                method: "POST",
                url: url,
                headers: headers,
                data: details
            }
            console.log("**************NODE JS FINAL REQUEST***************", request);
            const response = await axios(request);
            res.send(response.data);

        } catch (error) {
            next(error)
        }
    }
    async reserve(req, res, next) {
        try {
            const timestamp = new Date().getTime();
            const url = `${testUrl}/orders/reserve?timestamp=${timestamp}`;
            const body = {
                referrerAccountId: accountId,
            }
            const details = JSON.stringify(body);
            const headers = {};
            headers['Authorization'] = 'Bearer ' + WYRE_TOKEN;
            headers['cache-control'] = 'no-cache';
            headers['Content-Type'] = 'application/json';
            headers['X-Api-Key'] = 'AK-2MEBNEQ2-9ECH8EB6-UMTGH7TX-89GLB4EP';
            headers['X-Api-Signature'] = calcAuthSigHash(url + details);
            headers['timestamp'] = timestamp;
//headers['Postman-Token'] = WYRE_TOKEN;
            const config = {
                method: 'POST',
                url: url,
                headers: headers,
                data: details
            }
           await axios(config).then((response) => {
                console.log(response);
                res.send(response.data);
              }, (error) => {
                console.log(error);
              });;

        } catch (error) {
            next(error)
        }
    }

}