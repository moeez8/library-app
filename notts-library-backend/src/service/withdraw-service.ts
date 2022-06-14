import sequelize from "../config/database";

const { models } = require("../config/database");

const NewWithdrawService = () => {
	const GetAllWithdraws = async (): Promise<any> => {
		const result = await models.withdraw.findAll({
			include: [
				{
					model: models.copy,
					as: "copy",
					include: [{ model: models.book, as: "book" }],
				},
			],
		});

		return result;
	};

	const CreateNewWithdraw = async (copy_id: any, user_name: any): Promise<any> => {
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

	const GetWithdrawByID = async (id: any): Promise<any> => {
		const result = await models.withdraw.findByPk(parseInt(id));

		if (result == null) {
			throw new Error("Unable To Find Withdraw With ID");
		}

		return result;
	};

	return { GetAllWithdraws, CreateNewWithdraw, GetWithdrawByID };
};

export default NewWithdrawService;
