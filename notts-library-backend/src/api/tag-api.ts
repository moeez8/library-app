const { models } = require("../config/database");
import { Request, Response } from "express";
import NewTagService from "../service/tag-service";

const NewTagApi = () => {
	const getAllTags = async (req: Request, res: Response) => {
		res.json(await NewTagService().GetAllTags());
	};

	const createNewTag = async (req: Request, res: Response) => {
		const { tag } = req.body;
		if (tag != null) {
			res.json(await NewTagService().CreateNewTag(tag));
		} else {
			res.status(400).json({ error: "Missing Body Param 'tag'" });
		}
	};

	return { getAllTags, createNewTag };
};

export = NewTagApi;
