import express from "express";
import NewBooksTagApi from "../api/books-tag-api";

const booksTagRouter = () => {
	const router = express.Router();
	const booksTagApi = NewBooksTagApi();

	router.get("/", booksTagApi.GetAllBooksTags);
	router.post("/", booksTagApi.CreateNewBooksTag);

	return router;
};

export default booksTagRouter;
