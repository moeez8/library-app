const Sequelize = require("sequelize");
const db = require("../config/database");

const Book = db.define(
  "book",
  {
    title: {
      type: Sequelize.STRING,
    },
    iban: {
      type: Sequelize.STRING,
    },
    author: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    category: {
      type: Sequelize.STRING,
    },
    cover_photo: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
  },
  {
    tableName: "books",
    timestamps: false,
  }
);

module.exports = Book;
