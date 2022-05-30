const Sequelize = require("sequelize");
const db = require("../config/database");

const Book = db.define(
  "book",
  {
    title: {
      type: Sequelize.STRING,
    },
  },
  {
    tableName: "book",
  }
);

module.exports = Book;
