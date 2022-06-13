const { models } = require("../config/database");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const bookApi = () => {
	const searchForBook = (req: any, res: any) => {
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
				.then((books: any) => {
					console.log(books);
					res.send(books);
				})
				.catch((err: any) => {
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
				.then((books: any) => {
					console.log(books);
					res.send(books);
				})
				.catch((err: any) => {
					console.log("Error: " + err);
					res.status(400).json({ error: "Failed To Send Request" });
				});
		}
	};

	const getBookById = (req: any, res: any) => {
		models.book
			.findByPk(parseInt(req.params.id), {})
			.then((row: any) => {
				if (row) {
					res.send(row);
				} else {
					res.status(400).json({ error: "Not Able To Find Book" });
				}
			})
			.catch((err: any) => {
				res.status(400).json({ error: "Failed To Send Request" });
			});
	};

	const createNewBook = (req: any, res: any) => {
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
			.catch((err: any) => {
				console.log("Error: " + err);
				res.status(400).json({ error: "Failed To Send Request" });
				return;
			})
			.then((book: any) => {
				tags.map((tagObj: any) => {
					return models.tag
						.findOrCreate({
							where: {
								name: tagObj.tag_name,
							},
						})
						.then((foundTag: any) => {
							models.books_tag
								.create({
									book_id: book.id,
									tag_id: foundTag[0].id,
								})
								.catch((err: any) => {
									console.log("Error: " + err);
									res.sendStatus(400);
									return;
								});
						});
				});
				models.copy
					.create({
						book_id: book.id,
						owner: "BJSS",
					})
					.catch((err: any) => {
						res.status(400).send("Could Not Add A Copy");
						return;
					});
			})
			.then(() => {
				res.send("OK");
				return;
			})
			.catch((err: any) => {
				res.status(400).json({ error: "Failed To Send Request" });
				return;
			});
	};

	const updateBookById = (req: any, res: any) => {
		const { title, iban, author, type, category, cover_photo, desciption } = req.body;

		models.book
			.findByPk(parseInt(req.params.id))
			.then((row: any) => {
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
			.catch((err: any) => {
				res.status(400).json({ error: "Failed To Send Request" });
			});
	};

	const getCopiesByBookId = (req: any, res: any) => {
		models.book
			.findByPk(parseInt(req.params.id), {
				include: [{ model: models.copy, as: "copies" }],
			})
			.then((row: any) => {
				if (row) {
					res.send(row.copies);
				} else {
					res.status(400).json({ error: "Not Able To Find Book" });
				}
			})
			.catch((err: any) => {
				res.status(400).json({ error: "Failed To Send Request" });
			});
	};

	const getTagsByBookId = (req: any, res: any) => {
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
			.then((row: any) => {
				if (row) {
					res.send(row.tags);
				} else {
					res.status(400).json({ error: "Not Able To Find Book" });
				}
			})
			.catch((err: any) => {
				res.status(400).json({ error: "Failed To Send Request" });
			});
	};

	const deleteBookById = async (req: any, res: any) => {
		const Id = req.params.id;
		const book = await models.book.findByPk(Id);

		if (book !== null) {
			book.destroy();
			res.status(200).json({ msg: "Book Deleted" });
			return;
		} else {
			res.status(400).json({ error: "Not Able To Find Book With ID" });
			return;
		}
	};

	return {
		searchForBook,
		getBookById,
		createNewBook,
		updateBookById,
		getCopiesByBookId,
		getTagsByBookId,
		deleteBookById,
	};
};

export = bookApi;
