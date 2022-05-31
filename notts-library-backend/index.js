const express = require("express");
const bodyParser = require("body-parser");

// Database
const db = require("./config/database");

// Test DB
db.authenticate()
  .then(() => console.log("Database Connected..."))
  .catch((err) => console.log("Error:" + err));

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/book", require("./routes/book"));
app.use("/copy", require("./routes/copy"));
app.use("/withdraw", require("./routes/widthdraw"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started On PORT: ${PORT}`));
