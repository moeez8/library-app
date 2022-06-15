const { models } = require("../config/database");

const NewPurchaseRequestService = () => {
	const GetAllPurchaseRequests = async (): Promise<any> => {
		const result = models.tag.findAll();
		return result;
	};
	return { GetAllPurchaseRequests };
};

export default NewPurchaseRequestService;
