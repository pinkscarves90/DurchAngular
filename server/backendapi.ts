import * as express from 'express';
// This sample assumes use of Express Node.js framework 
const axios = require('axios');
const CryptoJS = require('crypto-js');
// Store API keys in your environment configuration.
const WYRE_APIKEY = 'AK-9W8LQ7YH-GZGPLRN6-TXURQX6P-E9BD7B7Y';
const WYRE_TOKEN = createWireToken();
const secretKey = JSON.stringify({ "secretKey": createWireToken() });

const productionUrl = "https://api.sendwyre.com/v3";
const testUrl = "https://api.testwyre.com/v3"

// Signature Calculation using Crypto-js
// function calcAuthSigHash(url_body) {
//     let hash = CryptoJS.HmacSHA256(url_body, WYRE_TOKEN);
//     return CryptoJS.enc.Hex.stringify(hash);
// }

const signature = (url_body) => {
    let hash = CryptoJS.HmacSHA256(url_body, WYRE_TOKEN);
    return CryptoJS.enc.Hex.stringify(hash);
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

    async ordersReserveID(req, res, next) {
        try {
            const timestamp = new Date().getTime();
            const url = `https://api.sendwyre.com/v3/orders/reserve?timestamp=${timestamp}`;
            const headers = {};
            const body = {
                referrerAccountId: req.body.referrerAccountId, //"AC_28ZMELGWTUR"
                amount: req.body.amount, //""
                sourceCurrency: req.body.sourceCurrency, //"USD"
            }
            const details = JSON.stringify(body);
            headers['Content-Type'] = 'application/json';
            headers['Authorization'] = 'Bearer ' + 'SK-CPFX4MWD-VU96QGLR-H7ECC2GV-WQ9RPNW2' //SK
            const config = {
                method: "POST",
                url: url,
                headers: headers,
                data: details
            }
            console.log(config);
            const response = await axios(config)
            console.log(response.data)
                    res.send(JSON.parse(JSON.stringify(response.data)))
  
        } catch (error) {
            next(error)
        }
    }

}