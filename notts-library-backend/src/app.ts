import express from "express";
const cors = require("cors");

import ApiErrorHandler from "./middleware/api-error-handler";

import newBookRouter from "./routes/book";
import newCopyRouter from "./routes/copy";
import newBooksTagRouter from "./routes/books_tag";
import newWithdrawsRouter from "./routes/widthdraw";
import newTagRouter from "./routes/tag";
import newPurchaseRequestRouter from "./routes/purchaseRequest";

import newOpenLibraryRouter from "./routes/openLibrary"

import IBookService from "./service/interfaces/IBook-Service";

const makeApp = (bookService: IBookService) => {
	//Create Express App
	const app = express();

	//Using JSON body parser middleware to recive body data
	app.use(express.json());

	//CORS Middleware
	app.use(
		cors({
			origin: "*",
		})
	);

	// Express Routes
	app.use("/book", newBookRouter(bookService));
	app.use("/copy", newCopyRouter());
	app.use("/withdraw", newWithdrawsRouter());
	app.use("/tag", newTagRouter());
	app.use("/books_tag", newBooksTagRouter());
	app.use("/request", newPurchaseRequestRouter());

	app.use("/ol", newOpenLibraryRouter());

	//Error Handle Middleware
	app.use(ApiErrorHandler);

	return app;
};

export default makeApp;
