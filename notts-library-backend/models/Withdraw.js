const Sequelize = require("sequelize");
const db = require("../config/database");

module.exports = (sequelize) => {
	sequelize.define(
		"withdraw",
		{
			copy_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			date_out: {
				type: Sequelize.DATEONLY,
				allowNull: false,
			},
			date_in: {
				type: Sequelize.DATEONLY,
			},
			user_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
		},
		{
			tableName: "withdraws",
			timestamps: false,
		}
	);
};
