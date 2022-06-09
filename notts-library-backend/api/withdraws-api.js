const { models } = require("../config/database");

const NewWithdrawsApi = () => {
	const GetAllWithdraws = (req, res) => {
		models.withdraw
			.findAll({
				include: [
					{
						model: models.copy,
						as: "copy",
						include: [{ model: models.book, as: "book" }],
					},
				],
			})
			.then((withdraws) => {
				console.log(withdraws);
				res.send(withdraws);
			})
			.catch((err) => {
				console.log("Error: " + err);
				res.sendStatus(400);
			});
	};

	const CreateNewWithdraw = (req, res) => {
		let { copy_id, user_name } = req.body;

		models.withdraw
			.create({
				copy_id,
				date_out: new Date(),
				user_name,
			})
			.then(() => res.sendStatus(200))
			.catch((err) => {
				console.log("Error: " + err);
				res.sendStatus(400);
			});
	};

	const GetWithdrawById = (req, res) => {
		models.withdraw
			.findByPk(parseInt(req.params.id))
			.then((row) => {
				if (row) {
					res.send(row);
				} else {
					res.sendStatus(400);
				}
			})
			.catch((err) => {
				console.log("Error: " + err);
				res.sendStatus(400);
			});
	};

	const UpdateWithdrawById = (req, res) => {
		models.withdraw
			.findByPk(parseInt(req.params.id))
			.then((row) => {
				if (row) {
					row.update({ date_in: new Date() });
					res.send(row);
				} else {
					res.sendStatus(400);
				}
			})
			.catch((err) => {
				console.log("Error: " + err);
				res.sendStatus(400);
			});
	};

	return { GetAllWithdraws, CreateNewWithdraw, GetWithdrawById, UpdateWithdrawById };
};

module.exports = NewWithdrawsApi;
