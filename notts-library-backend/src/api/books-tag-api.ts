const { models } = require("../config/database");
import { Request, Response } from "express";

const NewBooksTagApi = () => {
	const GetAllBooksTags = (req: Request, res: Response) => {
		models.books_tag
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

	const CreateNewBooksTag = (req: Request, res: Response) => {
		const { book_id, tag_id } = req.body;

		models.books_tag
			.create({
				book_id,
				tag_id,
			})
			.then(() => res.send("OK"))
			.catch((err: any) => {
				console.log("Error: " + err);
				res.sendStatus(400);
			});
	};

	return {
		GetAllBooksTags,
		CreateNewBooksTag,
	};
};

export = NewBooksTagApi;
