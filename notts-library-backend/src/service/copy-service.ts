const { models } = require("../config/database");
import { Op } from "sequelize";

const CopyService = () => {
	const AddNewCopy = async (id: any, owner: string): Promise<any> => {
		return await models.copy.create({
			book_id: id,
			owner: owner,
		});
	};

	const GetAllCopies = async (): Promise<any> => {
		return await models.copy.findAll();
	};

	const GetCopyByID = async (id: any): Promise<any> => {
		const result = await models.copy.findByPk(id);

		if (result == null) {
			throw new Error("Unable To Find Withdraw With ID");
		}

		return result;
	};

	const GetWithdrawsByCopyID = async (id: any): Promise<any> => {
		const result = await models.withdraw.findAll({
			order: [["date_out", "DESC"]],
			where: {
				copy_id: { [Op.eq]: id },
			},
		});

		if (result == null) {
			throw new Error("Unable To Find Withdraw With ID");
		}

		return result;
	};

	const CheckinCopyByID = async (id: any): Promise<any> => {
		const copy = await models.copy.findByPk(id, {
			include: [
				{
					model: models.withdraw,
					as: "withdraws",
					where: {
						date_in: { [Op.is]: null },
					},
					order: [["date_out", "DESC"]],
				},
			],
		});

		//Does Copy Exist?
		if (copy != null) {
			//Does Copy Currently Have A Withdraws Array And At Least One Item In That Array
			if (copy.withdraws != null && copy.withdraws.length > 0) {
				//Can Copy Be Checked In?
				const array = [...copy.withdraws];

				//Sort The Array Newwest -> Oldest
				array.sort((a, b) => {
					if (a.date_out < b.date_out) return 1;
					return -1;
				});

				const lastWithdraw = array[0];

				//If date_in Is Null Then Book Has Not Been Checked In
				if (lastWithdraw.date_in == null) {
					//Find The Withdraw By ID
					const result = await models.withdraw.findByPk(lastWithdraw.id);

					//Set The Date Param To Now
					await result.update({ date_in: new Date() });

					return result;
				} else {
					throw new Error("Copy Was Not Checked Out");
				}
			} else {
				throw new Error("Copy Was Not Checked Out");
			}
		} else {
			throw new Error("Unable To Find Copy With ID");
		}
	};

	const CheckoutCopyByID = async (id: any, name: any): Promise<any> => {
		const copy = await models.copy.findByPk(id, {
			include: [{ model: models.withdraw, as: "withdraws" }],
		});

		//Does Copy Exist?
		if (copy != null) {
			//Does Copy Currently Have A Withdraws Array And At Least One Item In That Array
			if (copy.withdraws != null && copy.withdraws.length > 0) {
				//Can Copy Be Checked Out?
				const array = [...copy.withdraws];

				//Sort The Array Newwest -> Oldest
				array.sort((a, b) => {
					if (a.date_out < b.date_out) return 1;
					return -1;
				});

				//If date_in Is Not Null Then Book Is Checked Out
				if (array[0].date_in != null) {
					const result = await models.withdraw.create({
						copy_id: id,
						date_out: new Date(),
						user_name: name,
					});
					return result;
				} else {
					throw new Error("Copy Was Not Checked In");
				}
			} else {
				const result = await models.withdraw.create({
					copy_id: id,
					date_out: new Date(),
					user_name: name,
				});
				return result;
			}
		} else {
			throw new Error("Unable To Find Copy With ID");
		}
	};

	const CheckCopyStatus = async (id: any): Promise<any> => {
		const copy = await models.copy.findByPk(id, {
			include: [{ model: models.withdraw, as: "withdraws" }],
		});

		if (copy) {
			if (copy.withdraws.length === 0) {
				return { status: true };
			} else {
				const withdraws = [...copy.withdraws];

				withdraws.sort((a, b) => {
					if (a.date_out < b.date_out) return 1;
					return -1;
				});

				if (withdraws[0].date_in === null) {
					return {
						status: false,
						user_name: withdraws[0].user_name
					};
				} else {
					return { status: true };
				}
			}
		} else {
			throw new Error("Unable To Find Copy With ID");
		}
	};

	return { AddNewCopy, GetAllCopies, GetCopyByID, GetWithdrawsByCopyID, CheckinCopyByID, CheckoutCopyByID, CheckCopyStatus };
};

export default CopyService;
