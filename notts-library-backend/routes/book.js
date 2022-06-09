const express = require("express");
const router = express.Router();
const { models } = require("../config/database");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

//Search For Book
router.get("/", (req, res) => {
	const { term } = req.query;

	if (term) {
		models.book
			.findAll({
				where: {
					[Op.or]: [{ title: { [Op.like]: "%" + term + "%" } }, { author: { [Op.like]: "%" + term + "%" } }, { iban: { [Op.like]: "%" + term + "%" } }, { category: { [Op.like]: "%" + term + "%" } }, { type: { [Op.like]: "%" + term + "%" } }],
				},
				include: [
					{ model: models.copy, as: "copies" },
					{
						model: models.tag,
						as: "tags",
						through: {
							attributes: ["tag_id", "book_id"],
						},
					},
				],
			})
			.then((books) => {
				console.log(books);
				res.send(books);
			})
			.catch((err) => {
				console.log("Error: " + err);
				res.status(400).json({ error: "Failed To Send Request" });
			});
	} else {
		models.book
			.findAll({
				include: [
					{ model: models.copy, as: "copies" },
					{
						model: models.tag,
						as: "tags",
						through: {
							attributes: ["tag_id", "book_id"],
						},
					},
				],
			})
			.then((books) => {
				console.log(books);
				res.send(books);
			})
			.catch((err) => {
				console.log("Error: " + err);
				res.status(400).json({ error: "Failed To Send Request" });
			});
	}
});

//Create New Book
router.post("/", (req, res) => {
	const { title, iban, author, type, category, cover_photo, description, tags } = req.body;

	models.book
		.create({
			title,
			iban,
			author,
			type,
			category,
			cover_photo,
			description,
		})
		.catch((err) => {
			console.log("Error: " + err);
			res.status(400).json({ error: "Failed To Send Request" });
		})
		.then((book) => {
			tags.map((tagObj) => {
				return models.tag
					.findOrCreate({
						where: {
							name: tagObj.tag_name,
						},
					})
					.then((foundTag) => {
						models.books_tag
							.create({
								book_id: book.id,
								tag_id: foundTag[0].id,
							})
							.catch((err) => {
								console.log("Error: " + err);
								res.sendStatus(400);
							});
					});
			});
		})
		.then(() => res.send())
		.catch((err) => {
			res.status(400).json({ error: "Failed To Send Request" });
		});
});

//Update A Book
router.put("/:id", (req, res) => {
	const { title, iban, author, type, category, cover_photo, desciption } = req.body;

	models.book
		.findByPk(parseInt(req.params.id))
		.then((row) => {
			if (row) {
				row.update({
					title: title || row.title,
					iban: iban || row.iban,
					author: author || row.author,
					type: type || row.type,
					category: category || row.category,
					cover_photo: cover_photo || row.cover_photo,
					desciption: desciption || row.desciption,
				});
				res.send(row);
			} else {
				res.sendStatus(400);
			}
		})
		.catch((err) => {
			res.status(400).json({ error: "Failed To Send Request" });
		});
});

//Get Book By Id
router.get("/:id", (req, res) => {
	models.book
		.findByPk(parseInt(req.params.id), {})
		.then((row) => {
			if (row) {
				res.send(row);
			} else {
				res.status(400).json({ error: "Not Able To Find Book" });
			}
		})
		.catch((err) => {
			res.status(400).json({ error: "Failed To Send Request" });
		});
});

//Get Copies Of A Book By ID
router.get("/:id/copies", (req, res) => {
	models.book
		.findByPk(parseInt(req.params.id), {
			include: [{ model: models.copy, as: "copies" }],
		})
		.then((row) => {
			if (row) {
				res.send(row.copies);
			} else {
				res.status(400).json({ error: "Not Able To Find Book" });
			}
		})
		.catch((err) => {
			res.status(400).json({ error: "Failed To Send Request" });
		});
});

//Get Tags Of A Book By ID
router.get("/:id/tags", (req, res) => {
	models.book
		.findByPk(parseInt(req.params.id), {
			include: [
				{
					model: models.tag,
					as: "tags",
					through: {
						attributes: ["tag_id", "book_id"],
					},
				},
			],
		})
		.then((row) => {
			if (row) {
				res.send(row.tags);
			} else {
				res.status(400).json({ error: "Not Able To Find Book" });
			}
		})
		.catch((err) => {
			res.status(400).json({ error: "Failed To Send Request" });
		});
});

module.exports = router;
