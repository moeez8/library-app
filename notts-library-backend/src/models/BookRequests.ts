const { Sequelize } = require("sequelize");

export = (sequelize: any) => {
	sequelize.define(
		"request",
		{
			book_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			request_date: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			fulfill_date: {
				type: Sequelize.DATE,
			},
			requestedBy: {
				type: Sequelize.STRING,
				allowNull: false,
			},
		},
		{
			tableName: "requests",
			paranoid: true,
		}
	);
};
