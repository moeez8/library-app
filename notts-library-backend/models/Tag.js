const Sequelize = require("sequelize");
const db = require("../config/database");

module.exports = (sequelize) => {
  sequelize.define(
    "tag",
    {
      tag: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "tags",
      timestamps: false,
    }
  );
};
