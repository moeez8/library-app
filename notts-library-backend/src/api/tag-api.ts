const { models } = require("../config/database");
import { Request, Response } from "express";

const NewTagApi = () => {
	const getAllTags = (req: Request, res: Response) => {
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

	const createNewTag = (req: Request, res: Response) => {
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
