const Sequelize = require("sequelize");
const db = require("../config/database");

module.exports = (sequelize) => {
  sequelize.define(
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
  )
};
