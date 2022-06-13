const { models } = require("../config/database");

const purchaseRequestApi = () => {
	const getAllRequests = (req: any, res: any) => {
		models.request
			.findAll({
				include: [{ model: models.book, as: "book" }],
			})
			.then((requests: any) => {
				console.log(requests);
				res.send(requests);
			})
			.catch((err: any) => {
				console.log("Error: " + err);
				res.status(400).send("Could Not Find Any Copies");
			});
	};

	const addRequest = (req: any, res: any) => {
		const { title, iban, author, type, category, cover_photo, description, tags, user } = req.body;

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
				res.sendStatus(400);
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
								});
						});
				});

				models.request
					.create({
						book_id: book.id,
						requestedBy: "Moeez",
						request_date: new Date(),
					})
					.catch((err: any) => {
						console.log("Error: " + err);
						res.sendStatus(400);
					});
			})

			.then(() => res.send("OK"))
			.catch((err: any) => {
				console.log("Error: " + err);
				res.sendStatus(400);
			});
	};

	const updateRequest = (req: any, res: any) => {
		models.request
			.findByPk(parseInt(req.params.id))
			.then((request: any) => {
				if (request) {
					request.update({
						fulfill_date: new Date(),
					});

					models.copy
						.create({
							book_id: request.book_id,
							owner: "BJSS",
						})
						.then(() => res.sendStatus(200))
						.catch((err: any) => {
							console.log("Error: " + err);
							res.status(400).send("Could Not Add A Copy");
						});
				}
			})
			.catch((err: any) => {
				console.log("Error: " + err);
				res.sendStatus(400);
			});
	};

	return {
		getAllRequests,
		addRequest,
		updateRequest,
	};
};

export = purchaseRequestApi;
