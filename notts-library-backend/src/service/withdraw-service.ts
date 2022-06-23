const { models } = require("../database/database");
import sequelize from "../database/database";

const newWithdrawService = () => {
	const getAllWithdraws = async (): Promise<any> => {
		return await models.withdraw.findAll({
			order: [["date_out", "DESC"]],
			// include: [
			// 	{
			// 		model: models.copy,
			// 		as: "copy",
			// 		include: [{ model: models.book, as: "book" }],
			// 	},
			// ],
		});
	};

	const createNewWithdraw = async (copy_id: any, user_name: any): Promise<any> => {
		let result: any;
		await sequelize.transaction(async () => {
			result = await models.withdraw.create({
				copy_id,
				date_out: new Date(),
				user_name,
			});
		});

		return result;
	};

	const getWithdrawByID = async (id: any): Promise<any> => {
		const result = await models.withdraw.findByPk(parseInt(id));

		if (result == null) {
			throw new Error("Unable To Find Withdraw With ID");
		}

		return result;
	};

	return { getAllWithdraws, createNewWithdraw, getWithdrawByID };
};

export default newWithdrawService;
