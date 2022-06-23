const { Sequelize } = require("sequelize");

export = (sequelize: any) => {
	sequelize.define(
		"withdraw",
		{
			copy_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			date_out: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			date_in: {
				type: Sequelize.DATE,
			},
			user_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
		},
		{
			tableName: "withdraws",
			paranoid: true,
		}
	);
};
