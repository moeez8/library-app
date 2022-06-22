import express from "express";
import newTagApi from "../api/tag-api";

const tagRouter = () => {
	const router = express.Router();
	const tagApi = newTagApi();

	router.get("/", tagApi.getAllTags);
	router.post("/", tagApi.createNewTag);

	return router;
};

export default tagRouter;
