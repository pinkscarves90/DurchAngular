"use strict";

const functions = require("firebase-functions");
const express = require("express");
const port=3000
const app = express()
const axios = require('axios');
const cors = require("cors");
const backendapi_1 = require("./backendapi");
const api = new backendapi_1.BackendApi();
const router = express.Router();
app.use(cors(), function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://durch-834c0.web.app"); // update to match the domain you will make the request from
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

router.post('/api/reserve', api.ordersReserveID.bind(api.ordersReserveID));
app.use(router);
app.listen(port, function () { return console.log("Node server started at localhost:" + port); })
exports.expressApp = functions.https.onRequest(app);