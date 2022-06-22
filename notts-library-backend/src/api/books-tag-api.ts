import { NextFunction, Request, Response } from "express";

import ApiError from "../middleware/api-error";
import newBooksTagService from "../service/books-tag-service";

const newBooksTagApi = () => {
	const booksTagService = newBooksTagService();

	const getAllBooksTags = async (req: Request, res: Response, next: NextFunction) => {
		try {
			res.json(await booksTagService.getAllBookTags());
			return;
		} catch (error: any) {
			next(ApiError.Internal(error.toString()));
			return;
		}
	};

	const createNewBooksTag = async (req: Request, res: Response, next: NextFunction) => {
		const { book_id, tag_id } = req.body;

		if (book_id == null) {
			next(ApiError.BadRequest("Please Fill Body Param book_id"));
		}
		if (tag_id == null) {
			next(ApiError.BadRequest("Please Fill Body Param tag_id"));
		}

		try {
			res.json(await booksTagService.createNewBooksTag(book_id, tag_id));
			return;
		} catch (error: any) {
			next(ApiError.Internal(error.toString()));
			return;
		}
	};

	return {
		getAllBooksTags,
		createNewBooksTag,
	};
};
export = newBooksTagApi;
