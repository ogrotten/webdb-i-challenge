const express = require('express');

const dbrouter = require("./routes/dbroutes.js")

const db = require('./data/dbConfig.js');

const server = express();
server.use("/api/db", dbrouter)

server.use(express.json());

module.exports = server;