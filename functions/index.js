"use strict";

const functions = require("firebase-functions");
const express = require("express");
const port=3000
const app = express()
const axios = require('axios');


app.post('/api/reserve',(req,res,next)=>{
    const timestamp = new Date().getTime();
    const url = `https://api.testwyre.com/v3/orders/reserve?timestamp=${timestamp}`;
    const headers = {};
    const body = {
        referrerAccountId: req.body.referrerAccountId, //"AC_28ZMELGWTUR"
        sourceCurrency: req.body.sourceCurrency, //"USD"
    }
    const details = JSON.stringify(body);
    headers['Content-Type'] = 'application/json';
    headers['Authorization'] = 'Bearer ' + 'SK-VM7DLZA2-U9TR7XD9-BA4U3C44-AFDHP2LJ' //SK
    const config = {
        method: "POST",
        url: url,
        headers: headers,
        data: details
    }
    const response = axios(config)
    console.log(response.data)
            res.send(JSON.parse(JSON.stringify(response.data)))

});
app.listen(port, function () { return console.log("Node server started at localhost:" + port); })
exports.expressApp = functions.https.onRequest(app);