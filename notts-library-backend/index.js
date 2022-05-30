const express = require("express");

const Sequelize = require("sequelize");
const db = new Sequelize("Library", "root", "root", {
  host: "localhost",
  dialect: "postgres",
});

//Test DB

db.authenticate()
  .then(() => console.log("Database Connected..."))
  .catch((err) => console.log("Error:" + err));

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started On PORT: ${PORT}`));
