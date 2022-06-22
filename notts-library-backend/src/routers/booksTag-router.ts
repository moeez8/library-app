import express from "express";
import newBooksTagApi from "../api/books-tag-api";

const booksTagRouter = () => {
	const router = express.Router();
	const booksTagApi = newBooksTagApi();

	router.get("/", booksTagApi.getAllBooksTags);
	router.post("/", booksTagApi.createNewBooksTag);

	return router;
};

export default booksTagRouter;
