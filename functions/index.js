"use strict";

const functions = require("firebase-functions");
const express = require("express");

const app = express()


exports.expressApp = functions.https.onRequest(app);