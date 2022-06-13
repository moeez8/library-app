const { models } = require("../config/database");

const NewTagApi = () => {
	const getAllTags = (req: any, res: any) => {
		models.tag
			.findAll()
			.then((tags: any) => {
				console.log(tags);
				res.send(tags);
			})
			.catch((err: any) => {
				console.log("Error: " + err);
				res.sendStatus(400);
			});
	};

	const createNewTag = (req: any, res: any) => {
		const { name } = req.body;

		models.tag
			.create({
				name,
			})
			.then(() => res.send("OK"))
			.catch((err: any) => {
				console.log("Error: " + err);
				res.sendStatus(400);
			});
	};

	return { getAllTags, createNewTag };
};

export = NewTagApi;
