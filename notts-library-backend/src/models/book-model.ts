const { Sequelize } = require("sequelize");

export = (sequelize: any) => {
	sequelize.define(
		"book",
		{
			title: {
				type: Sequelize.STRING,
			},
			ISBN: {
				type: Sequelize.STRING,
			},
			author: {
				type: Sequelize.STRING,
			},
			description: {
				type: Sequelize.TEXT,
			},
		},
		{
			tableName: "books",
			paranoid: true,
		}
	);
};
