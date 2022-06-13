const { models } = require("../config/database");
const Sequelize = require("sequelize");

const NewTagService = () => {
	const GetAllTags = async (): Promise<any> => {
		const result = models.tag.findAll();
		return result;
	};

	const CreateNewTag = async (name: any): Promise<any> => {
		const newTag = models.tag.create({
			name,
		});
		return newTag;
	};

	return { GetAllTags, CreateNewTag };
};

export default NewTagService;
