const { models } = require("../config/database");
import sequelize from "../config/database";
const Sequelize = require("sequelize");

const NewTagService = () => {
	const GetAllTags = async (): Promise<any> => {
		return await models.tag.findAll();
	};

	const CreateNewTag = async (name: any): Promise<any> => {
		let result: any;
		await sequelize.transaction(async () => {
			result = await models.tag.create({
				name,
			});
		});
		return result;
	};

	return { GetAllTags, CreateNewTag };
};

export default NewTagService;
