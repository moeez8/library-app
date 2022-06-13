const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Database
const db = require("./config/database");

// Test DB Connection
db.authenticate()
	.then(() => console.log("Database Connected..."))
	.catch((err: any) => console.log("Error:" + err));

// Create DB Tables
db.sync({ force: false })
	.then()
	.catch((err: any) => console.log("Error:" + err));

//Create Express App
const app = express();

//Using JSON body parser middleware to recive body data
app.use(bodyParser.json({ extended: false }));

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started On PORT: ${PORT}`));
