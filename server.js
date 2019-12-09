const express = require('express');

const dbrouter = require("./routes/dbroutes.js")

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());
server.use("/api/db", dbrouter)

module.exports = server;