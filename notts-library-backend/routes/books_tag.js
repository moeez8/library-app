const express = require("express");
const router = express.Router();
const { models } = require("../config/database");
const Sequelize = require("sequelize");

//Get All Books Tag
router.get("/", (req, res) => {
	models.books_tag
		.findAll()
		.then((tags) => {
			console.log(tags);
			res.send(tags);
		})
		.catch((err) => {
			console.log("Error: " + err);
			res.sendStatus(400);
		});
});

//Create New Books Tag
router.post("/", (req, res) => {
	const { book_id, tag_id } = req.body;

	models.books_tag
		.create({
			book_id,
			tag_id,
		})
		.then(() => res.send("OK"))
		.catch((err) => {
			console.log("Error: " + err);
			res.sendStatus(400);
		});
});

module.exports = router;
