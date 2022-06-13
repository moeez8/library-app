const Sequelize = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define(
		"tag",
		{
			name: {
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
