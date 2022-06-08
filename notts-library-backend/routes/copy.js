const express = require("express");
const router = express.Router();
//const Copy = require("../models/Copy");
const { models } = require("../config/database");

//Get All Copies
router.get("/", (req, res) => {
	models.copy
		.findAll({
			include: [
				{ model: models.withdraw, as: "withdraws" },
				{ model: models.book, as: "book" },
			],
		})
		.then((copies) => {
			console.log(copies);
			res.send(copies);
		})
		.catch((err) => {
			console.log("Error: " + err);
			res.sendStatus(400);
		});
});

//Get All Copies with withdraws
router.get("/all", (req, res) => {
	models.copy
		.findAll({
			include: ["withdraws"],
		})
		.then((copies) => {
			console.log(copies);
			res.send(copies);
		})
		.catch((err) => {
			console.log("Error: " + err);
			res.sendStatus(400);
		});
});

//Add New Copy
router.post("/add", (req, res) => {
	const { book_id, owner } = req.body;

	models.copy
		.create({
			book_id,
			owner,
		})
		.then(() => res.sendStatus(200))
		.catch((err) => {
			console.log("Error: " + err);
			res.sendStatus(400);
		});
});

//Get A Copy By ID
router.get("/:id", (req, res) => {
	models.copy
		.findByPk(parseInt(req.params.id))
		.then((row) => {
			if (row) {
				res.send(row);
			} else {
				res.sendStatus(400);
			}
		})
		.catch((err) => {
			console.log("Error: " + err);
			res.sendStatus(400);
		});
});

//Get Withdraws Of A Copy By ID
router.get("/:id/withdraws", (req, res) => {
	models.copy
		.findByPk(parseInt(req.params.id), {
			include: [{ model: models.withdraw, as: "withdraws" }],
		})
		.then((row) => {
			if (row) {
				res.send(row.withdraws);
			} else {
				res.sendStatus(400);
			}
		})
		.catch((err) => {
			console.log("Error: " + err);
			res.sendStatus(400);
		});
});

module.exports = router;
