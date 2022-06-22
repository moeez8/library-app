import { NextFunction, Request, Response } from "express";

import newTagService from "../service/tag-service";
import ApiError from "../middleware/api-error";

const newTagApi = () => {
	const tagService = newTagService();

	const getAllTags = async (req: Request, res: Response, next: NextFunction) => {
		try {
			res.json(await tagService.getAllTags());
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
			res.json(await tagService.createNewTag(tag));
			return;
		} catch (error: any) {
			next(ApiError.Internal(error.toString()));
		}
	};

	return { getAllTags, createNewTag };
};

export = newTagApi;
