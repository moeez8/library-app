import { Sequelize } from "sequelize";
import { associations } from "./associations";

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

const modelDefiners = [require("../models/book-model"), require("../models/copy-model"), require("../models/withdraw-model"), require("../models/tag-model"), require("../models/bookRequest-model")];

for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

associations(sequelize);

export = sequelize;
