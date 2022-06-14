import { NextFunction, Request, Response } from "express";
import ApiError from "../middleware/api-error";
import NewTagService from "../service/tag-service";

const NewTagApi = () => {
	const getAllTags = async (req: Request, res: Response, next: NextFunction) => {
		try {
			res.json(await NewTagService().GetAllTags());
			return;
		} catch (error: any) {
			next(ApiError.Internal(error.toString()));
		}
	};

	const createNewTag = async (req: Request, res: Response, next: NextFunction) => {
		const { tag } = req.body;

		if (tag == null) {
			next(ApiError.BadRequest("Please Fill Body Param tag"));
		}

		try {
			res.json(await NewTagService().CreateNewTag(tag));
			return;
		} catch (error: any) {
			next(ApiError.Internal(error.toString()));
		}
	};

	return { getAllTags, createNewTag };
};

export = NewTagApi;
