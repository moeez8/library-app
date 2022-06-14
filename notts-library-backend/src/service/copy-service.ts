const { models } = require("../config/database");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const CopyService = () => {
	const AddNewCopy = async (id: any, owner: string): Promise<any> => {
		const copy = await models.copy.create({
			book_id: id,
			owner: owner,
		});
		return copy;
	};

	const GetAllCopies = async (): Promise<any> => {
		const copies = await models.copy.findAll();
		return copies;
	};

	const GetCopyByID = async (id: any): Promise<any> => {
		const copy = models.copy.findByPk(id);
		return copy;
	};

	const GetCopyWithdrawsByID = async (id: any): Promise<any> => {
		const withdraws = models.copy.findByPk(id, {
			include: [{ model: models.withdraw, as: "withdraws" }],
		});
		return withdraws;
	};

	const CheckinCopyByID = async (id: any): Promise<any> => {
		const copy = await models.copy.findByPk(id, {
			include: [{ model: models.withdraw, as: "withdraws" }],
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
					const result = models.withdraw.findByPk(lastWithdraw.id);

					//Set The Date Param To Now
					result.update({ date_in: new Date() });

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

	const CheckoutCopyByID = async (id: any): Promise<any> => {
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
						user_name: "Dave",
					});
					return result;
				} else {
					throw new Error("Copy Was Not Checked In");
				}
			} else {
				const result = models.withdraw.create({
					copy_id: id,
					date_out: new Date(),
					user_name: "Dave",
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
					return { status: false };
				} else {
					return { status: true };
				}
			}
		}
		return copy;
	};

	return { AddNewCopy, GetAllCopies, GetCopyByID, GetCopyWithdrawsByID, CheckinCopyByID, CheckoutCopyByID, CheckCopyStatus };
};

export default CopyService;
