const Sequelize = require("sequelize");
const db = require("../config/database");

module.exports = (sequelize) => {
  sequelize.define(
    "withdraw",
    {
      copy_id: {
        type: Sequelize.INTEGER,
      },
      date_out: {
        type: Sequelize.DATEONLY,
      },
      date_in: {
        type: Sequelize.DATEONLY,
      },
      user_name: {
        type: Sequelize.STRING,
      },
    },
    {
      tableName: "withdraws",
      timestamps: false,
    }
  )
};
