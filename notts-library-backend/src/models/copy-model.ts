const Sequelize = require("sequelize");

export = (sequelize: any) => {
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
			paranoid: true,
		}
	);
};
