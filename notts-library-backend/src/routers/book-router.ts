import express from "express";
import newBookApi from "../api/book-api";

const bookRouter = () => {
	const router = express.Router();
	const bookApi = newBookApi();

	router.get("/", bookApi.searchForBook);
	router.post("/", bookApi.createNewBook);
	router.put("/:id", bookApi.updateBookById);
	router.get("/:id", bookApi.getBookById);
	router.get("/:id/copies", bookApi.getCopiesByBookId);
	router.get("/:id/tags", bookApi.getTagsByBookId);
	router.delete("/:id", bookApi.deleteBookById);

	return router;
};

export default bookRouter;
