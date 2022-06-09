const Sequelize = require("sequelize");
const { associations } = require("./associations");

const sequelize = new Sequelize("postgres", "root", "root", {
	host: "localhost",
	dialect: "postgres",

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
});

const modelDefiners = [require("../models/Book"), require("../models/Copy"), require("../models/Withdraw"), require("../models/Tag"), require("../models/BookRequests")];

for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

associations(sequelize);

module.exports = sequelize;
