const express = require('express');
const db = require('../data/dbConfig.js');
const router = express.Router();

const knex= require("../data/dbConfig.js")

router.get("/", (req, res) => {
	knex
	.select("*")
	.from("Accounts")
	.then(accts => {
		res.status(200).json(accts)
	})
	.catch(err => {
		res.status(500).json({msg: "Problem", err: err});
	});
});

module.exports = router;