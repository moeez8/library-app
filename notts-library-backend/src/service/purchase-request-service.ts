const { models } = require("../config/database");
const Sequelize = require("sequelize");

const NewPurchaseRequestService = () => {
	const GetAllPurchaseRequests = async (): Promise<any> => {
		const result = models.tag.findAll();
		return result;
	};
	return { GetAllPurchaseRequests };
};

export default NewPurchaseRequestService;
