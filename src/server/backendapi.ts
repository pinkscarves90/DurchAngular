import * as express from 'express'; 
// This sample assumes use of Express Node.js framework 
const axios = require('axios');
const CryptoJS = require('crypto-js');

// Store API keys in your environment configuration.
const YOUR_WYRE_API_KEY = 'AK-9W8LQ7YH-GZGPLRN6-TXURQX6P-E9BD7B7Y';
const YOUR_WYRE_SECRET_KEY = '';

const productionUrl = "https://api.sendwyre.com/v3";
const testUrl = "https://api.testwyre.com/v3"

// Signature Calculation using Crypto-js
const signature = (url, data) => {
    const dataToSign = url + data;
    const token = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(dataToSign.toString(CryptoJS.enc.Utf8), YOUR_WYRE_SECRET_KEY));
    return token;
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
            headers['X-Api-Key'] = YOUR_WYRE_API_KEY;
            headers['X-Api-Signature'] = signature(url, details);

            const config = {
                method: "POST",
                url: url,
                headers: headers,
                data: details
            }
            console.log("**************NODE JS FINAL REQUEST***************",config);
            const response = await axios(config);
            res.send(response.data);

        } catch (error) {
            next(error)
        }
    }
    async reserve(req, res, next) {
        try {
            const timestamp = new Date().getTime();
            const url = `${testUrl}/orders/reserve`;
            const headers = {};
            const body = {
                referrerAccountId: "AC_28ZMELGWTUR",
            }
            const details = JSON.stringify(body);

            //headers['Authorization'] = 'Bearer'+ ' '+ YOUR_WYRE_API_KEY;
            //headers['cache-control'] = 'no-cache';
            headers['Content-Type'] = 'application/json';
            headers['X-Api-Key'] = YOUR_WYRE_API_KEY;
            headers['X-Api-Signature'] = signature(url, details);
            const config = {
                method: "POST",
                url: url,
                headers: headers,
                data: details
            }
            console.log("**************NODE JS FINAL REQUEST***************",config);
            const response = await axios(config);
            console.log("**************AXIOS***************",response);
            res.send(response.data);

        } catch (error) {
            next(error)
        }
    }
    createWireToken(){
        let date = new Date().getTime();
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (date + Math.random()*16)%16 | 0;
            
            date = Math.floor(date/16);
    
            return (c =='x' ? r : (r&0x3|0x8)).toString(16);
        });
    
        return uuid;
    }
}