const express = require('express');
const db = require('../data/dbConfig.js');
const router = express.Router();

const knex = require("../data/dbConfig.js")

router.get("/", (req, res) => {
	knex
		.select("*")
		.from("Accounts")
		.then(accts => {
			res.status(200).json(accts)
		})
		.catch(err => {
			res.status(500).json({ msg: "Problem reading all", err: err });
		});
});

router.get("/:id", (req, res) => {
	knex
		.select("*")
		.from("Accounts")
		.where({ id: req.params.id })
		.first()
		.then(acct => {
			acct
				? res.status(200).json(acct)
				: res.status(404).json(`No acct at ${req.params.id}.`)
		})
		.catch(err => {
			res.status(500).json({ msg: "Problem reading one", err: err });
		});
})

router.post("/", (req, res) => {
	const acctData = req.body
	// clg("37",req);
	if (!acctData.name || !acctData.budget) {
		res.status(401).json({ msg: "Problem", err: "Incomplete data." })
	}
	knex("accounts")
		.insert(acctData, "id")
		.then(accts => {
			clg(accts[0])
			const acct = accts[0];
			return knex("Accounts")
				.select("name")
				.where({ id: acct })
				.first()
				.then(acct => {
					res.status(201).json(acct);
				})
		})
		.catch(err => {
			res.status(500).json({ msg: "Problem adding", err: err });
		});
})

router.delete("/:id", (req, res) => {
	knex("accounts")
	.where({id: req.params.id})
	.del()
	.then(count => {
		res.status(200).json({msg: `${count} deleted`});
	})
	.catch(err => {
		res.status(500).json({ msg: "Problem Deleting", err: err });
	});
})

router.put("/:id", (req, res) => {
	const id = req.params.id;
	const chg = req.body;
	knex("accounts")
	.where({id})
	.update(chg)
	.then(count => {
		count > 0
		? res.status(200).json({msg: `${count} modified`})
		: res.status(404).json({msg: `${id} not found`});
	})
	.catch(err => {
		res.status(500).json({ msg: "Problem Editing", err: err });
	});
})

module.exports = router;

function clg(...x) { console.log(...x) }