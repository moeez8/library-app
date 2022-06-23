import express from "express";
const cors = require("cors");

import ApiErrorHandler from "./middleware/api-error-handler";

import newBookRouter from "./routers/book-router";
import newCopyRouter from "./routers/copy-router";
import newBooksTagRouter from "./routers/booksTag-router";
import newWithdrawsRouter from "./routers/widthdraw-router";
import newTagRouter from "./routers/tag-router";
import newPurchaseRequestRouter from "./routers/purchaseRequest-router";
import newOpenLibraryRouter from "./routes/openLibrary"

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
app.use("/book", newBookRouter());
app.use("/copy", newCopyRouter());
app.use("/withdraw", newWithdrawsRouter());
app.use("/tag", newTagRouter());
app.use("/books_tag", newBooksTagRouter());
app.use("/request", newPurchaseRequestRouter());
app.use("/ol", newOpenLibraryRouter());

//Error Handle Middleware
app.use(ApiErrorHandler);

// Database
const db = require("./database/database");

// Test DB Connection
db.authenticate()
	.then(() => console.log("Database Connected..."))
	.catch((err: any) => console.log("Error:" + err));

// Create DB Tables
db.sync({ force: false })
	.then()
	.catch((err: any) => console.log("Error:" + err));

export default app;
