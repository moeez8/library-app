const Sequelize = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define(
		"copy",
		{
			book_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			owner: {
				type: Sequelize.STRING,
				allowNull: false,
			},
		},
		{
			tableName: "copies",
			timestamps: false,
		}
	);
};
