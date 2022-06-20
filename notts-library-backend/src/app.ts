import express from "express";
const cors = require("cors");

import ApiErrorHandler from "./middleware/api-error-handler";

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
app.use("/book", require("./routes/book"));
app.use("/copy", require("./routes/copy"));
app.use("/withdraw", require("./routes/widthdraw"));
app.use("/tag", require("./routes/tag"));
app.use("/books_tag", require("./routes/books_tag"));
app.use("/request", require("./routes/purchaseRequest"));

//Error Handle Middleware
app.use(ApiErrorHandler);

export default app;
