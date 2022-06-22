import express from "express";
import newBookApi from "../api/book-api";
import IBookService from "../service/interfaces/IBook-Service";

const bookRouter = (bookService: IBookService) => {
	const router = express.Router();
	const bookApi = newBookApi(bookService);

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
