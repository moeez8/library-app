const Sequelize = require("sequelize");

export = (sequelize: any) => {
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
			paranoid: true,
		}
	);
};
