import { NextFunction, Request, Response } from "express";

import ApiError from "../middleware/api-error";
import NewBooksTagService from "../service/books-tag-service";

const NewBooksTagApi = () => {
	const GetAllBooksTags = async (req: Request, res: Response, next: NextFunction) => {
		try {
			res.json(await NewBooksTagService().GetAllBookTags());
			return;
		} catch (error: any) {
			next(ApiError.Internal(error.toString()));
			return;
		}
	};

	const CreateNewBooksTag = async (req: Request, res: Response, next: NextFunction) => {
		const { book_id, tag_id } = req.body;

		if (book_id == null) {
			next(ApiError.BadRequest("Please Fill Body Param book_id"));
		}
		if (tag_id == null) {
			next(ApiError.BadRequest("Please Fill Body Param tag_id"));
		}

		try {
			res.json(await NewBooksTagService().CreateNewBooksTag(book_id, tag_id));
			return;
		} catch (error: any) {
			next(ApiError.Internal(error.toString()));
			return;
		}
	};

	return {
		GetAllBooksTags,
		CreateNewBooksTag,
	};
};

export = NewBooksTagApi;
