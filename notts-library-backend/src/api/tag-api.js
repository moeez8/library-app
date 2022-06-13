const { models } = require("../config/database");

const NewBookApi = () => {
	const getAllTags = (req, res) => {
		models.tag
			.findAll()
			.then((tags) => {
				console.log(tags);
				res.send(tags);
			})
			.catch((err) => {
				console.log("Error: " + err);
				res.sendStatus(400);
			});
	};

	const createNewTag = (req, res) => {
		const { name } = req.body;

		models.tag
			.create({
				name,
			})
			.then(() => res.send("OK"))
			.catch((err) => {
				console.log("Error: " + err);
				res.sendStatus(400);
			});
	};

	return { getAllTags, createNewTag };
};

module.exports = NewBookApi;
