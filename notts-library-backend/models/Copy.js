const Sequelize = require("sequelize");
const db = require("../config/database");

const Copy = db.define(
  "copy",
  {
    book_id: {
      type: Sequelize.INTEGER,
    },
  },
  {
    tableName: "copies",
    timestamps: false,
  }
);

module.exports = Copy;
