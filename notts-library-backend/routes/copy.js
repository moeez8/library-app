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
			res.status(400).send("Could Not Find Any Copies");
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
			res.status(400).send("Could Not Add A Copy");
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
			res.status(400).send("Could Not Find Copy");
		});
});

//Get Withdraws Of A Copy By ID
router.get("/:id/withdraws", (req, res) => {
	models.copy
		.findByPk(parseInt(req.params.id), {
			include: [{ model: models.withdraw, as: "withdraws" }],
		})
		.then((row) => {
			res.send(row.withdraws);
		})
		.catch((err) => {
			console.log("Error: " + err);
			res.status(400).send("Could Not Find Copy");
		});
});

//Check Out A Copy By ID
router.get("/:id/check-in", (req, res) => {
	models.copy
		.findByPk(parseInt(req.params.id), {
			include: [{ model: models.withdraw, as: "withdraws" }],
		})
		.then((row) => {
			//Can Copy Be Checked Out?

			const array = [...row.withdraws];

			array.sort((a, b) => {
				if (a.date_out < b.date_out) return 1;
				return -1;
			});

			if (array[0] && !array[0].date_in) {
				models.withdraw.findByPk(array[0].id).then((rowb) => {
					rowb.update({ date_in: new Date() });
					res.send(rowb);
				});
			} else {
				res.status(400).send("Copy Could Not Be Checked In");
			}
		})
		.catch((err) => {
			console.log("Error: " + err);
			res.status(400).send("Copy Not Found");
		});
});

//Check In A Copy By ID
router.get("/:id/check-out", (req, res) => {
	models.copy
		.findByPk(parseInt(req.params.id), {
			include: [{ model: models.withdraw, as: "withdraws" }],
		})
		.then((row) => {
			//Can Copy Be Checked Out?

			const array = [...row.withdraws];

			array.sort((a, b) => {
				if (a.date_out < b.date_out) return 1;
				return -1;
			});

			if (array[0]) {
				if (array[0].date_in != null) {
					models.withdraw
						.create({
							copy_id: req.params.id,
							date_out: new Date(),
							user_name: "Dave",
						})
						.then(() => res.sendStatus(200))
						.catch((err) => {
							console.log("Error: " + err);
							res.sendStatus(400);
						});
				} else {
					res.status(400).send("Copy Could Not Be Checked Out");
				}
			} else {
				models.withdraw
					.create({
						copy_id: req.params.id,
						date_out: new Date(),
						user_name: "Dave",
					})
					.then(() => res.sendStatus(200))
					.catch((err) => {
						console.log("Error: " + err);
						res.status(400).send("Copy Could Not Be Checked In");
					});
			}
		})
		.catch((err) => {
			console.log("Error: " + err);
			res.status(400).send("Copy Not Found");
		});
});

//Check In A Copy By ID
router.get("/:id/status", (req, res) => {
	models.copy
		.findByPk(parseInt(req.params.id), {
			include: [{ model: models.withdraw, as: "withdraws" }],
		})
		.then((row) => {
			if (row.withdraws == null) {
				res.json({ "checked-in": false });
				return;
			}

			const withdraws = [...row.withdraws];

			withdraws.sort((a, b) => {
				if (a.date_out < b.date_out) return 1;
				return -1;
			});

			if (withdraws[0].date_in === null) {
				res.json({ "checked-in": false });
			} else {
				res.json({ "checked-in": true });
			}
		})
		.catch((err) => {
			console.error(err);
			res.status(400).send("Copy Not Found");
		});
});

module.exports = router;
