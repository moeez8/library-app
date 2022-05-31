const Sequelize = require("sequelize");
const db = require("../config/database");

const Withdraw = db.define(
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
);

module.exports = Withdraw;
