const { models } = require("../database/database");

import sequelize from "../database/database";

const newTagService = () => {
	const getAllTags = async (): Promise<any> => {
		return await models.tag.findAll();
	};

	const createNewTag = async (name: any): Promise<any> => {
		let result: any;
		await sequelize.transaction(async () => {
			result = await models.tag.create({
				name,
			});
		});
		return result;
	};

	return { getAllTags, createNewTag };
};

export default newTagService;
