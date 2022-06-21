import makeApp from "./app";
import newBookService from "./service/book-service";

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

const PORT = process.env.PORT || 5000;

const app = makeApp(newBookService());

app.listen(PORT, () => console.log(`Server Started On PORT: ${PORT}`));
