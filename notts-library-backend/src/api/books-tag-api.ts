const { models } = require("../config/database");
import { Request, Response } from "express";
import NewBooksTagService from "../service/books-tag-service";

const NewBooksTagApi = () => {
	const GetAllBooksTags = async (req: Request, res: Response) => {
		res.json(await NewBooksTagService().GetAllBookTags());
	};

	const CreateNewBooksTag = async (req: Request, res: Response) => {
		const { book_id, tag_id } = req.body;

		if (book_id == null) {
			res.status(400).json({ error: "Missing Body Param 'book_id'" });
		}
		if (tag_id == null) {
			res.status(400).json({ error: "Missing Body Param 'tag_id'" });
		}

		res.json(await NewBooksTagService().CreateNewBooksTag(book_id, tag_id));
		return;
	};

	return {
		GetAllBooksTags,
		CreateNewBooksTag,
	};
};

export = NewBooksTagApi;
