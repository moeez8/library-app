const { Sequelize } = require("sequelize");

export = (sequelize: any) => {
	sequelize.define(
		"book",
		{
			title: {
				type: Sequelize.STRING,
			},
			iban: {
				type: Sequelize.STRING,
			},
			author: {
				type: Sequelize.STRING,
			},
			type: {
				type: Sequelize.STRING,
			},
			category: {
				type: Sequelize.STRING,
			},
			cover_photo: {
				type: Sequelize.STRING,
			},
			description: {
				type: Sequelize.STRING,
			},
		},
		{
			tableName: "books",
			paranoid: true,
		}
	);
};
