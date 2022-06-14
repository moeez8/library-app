const { models } = require("../config/database");
import { Request, Response } from "express";
import CopyService from "../service/copy-service";

const copyApi = () => {
	const addNewCopy = async (req: Request, res: Response) => {
		const { book_id, owner } = req.body;

		if (book_id == null) {
			res.status(400).json({ error: "Missing Property book_id" });
			return;
		}
		else if (owner == null) {
			res.status(400).json({ error: "Missing Property owner" });
			return;
		}

		else {
			res.json(await CopyService().AddNewCopy(book_id, owner));
		}
	};

	const getAllCopies = async (req: Request, res: Response) => {
		res.json(await CopyService().GetAllCopies());
	};

	const getCopyByID = async (req: Request, res: Response) => {
		if (req.params && req.params.id && typeof req.params.id === "string") {
			let id = parseInt(req.params.id);
			res.json(await CopyService().GetCopyByID(id));
			return;
		}
	};

	const getCopyWithdrawsByID = async (req: Request, res: Response) => {
		if (req.params && req.params.id && typeof req.params.id === "string") {
			let id = parseInt(req.params.id);
			res.json(await CopyService().GetCopyWithdrawsByID(id));
			return;
		}
	};

	const checkinCopyByID = (req: Request, res: Response) => {
		models.copy
			.findByPk(parseInt(req.params.id), {
				include: [{ model: models.withdraw, as: "withdraws" }],
			})
			.then((row: any) => {
				if (row) {
					//Can Copy Be Checked Out?

					const array = [...row.withdraws];

					array.sort((a, b) => {
						if (a.date_out < b.date_out) return 1;
						return -1;
					});

					if (array[0] && !array[0].date_in) {
						models.withdraw.findByPk(array[0].id).then((rowb: any) => {
							rowb.update({ date_in: new Date() });
							res.send(rowb);
						});
					} else {
						res.status(400).send("Copy Could Not Be Checked In");
					}
				} else {
					res.status(400).json({ error: "Failed To Find Row" });
				}
			})
			.catch((err: any) => {
				res.status(400).json({ error: "Failed To Find Row", msg: err });
			});
	};

	const checkoutCopyByID = (req: Request, res: Response) => {
		models.copy
			.findByPk(parseInt(req.params.id), {
				include: [{ model: models.withdraw, as: "withdraws" }],
			})
			.then((row: any) => {
				if (row) {
					//Can Copy Be Checked Out?

					const array = [...row.withdraws];

					array.sort((a, b) => {
						if (a.date_out < b.date_out) return 1;
						return -1;
					});

					if (array[0]) {
						if (array[0].date_in != null) {
							models.withdraw
								.create({
									copy_id: req.params.id,
									date_out: new Date(),
									user_name: "Dave",
								})
								.then(() => res.sendStatus(200))
								.catch((err: any) => {
									console.log("Error: " + err);
									res.sendStatus(400);
								});
						} else {
							res.status(400).send("Copy Could Not Be Checked Out");
						}
					} else {
						models.withdraw
							.create({
								copy_id: req.params.id,
								date_out: new Date(),
								user_name: "Dave",
							})
							.then(() => res.sendStatus(200))
							.catch((err: any) => {
								console.log("Error: " + err);
								res.status(400).send("Copy Could Not Be Checked In");
							});
					}
				} else {
					res.status(400).json({ error: "Failed To Find Row", msg: "err" });
				}
			})
			.catch((err: any) => {
				res.status(400).send("Copy Not Found");
			});
	};

	const checkCopyStatus = (req: Request, res: Response) => {
		models.copy
			.findByPk(parseInt(req.params.id), {
				include: [{ model: models.withdraw, as: "withdraws" }],
			})
			.then((row: any) => {
				if (row) {
					if (row.withdraws.length === 0) {
						res.json({ status: true });
						return;
					} else {
						const withdraws = [...row.withdraws];

						withdraws.sort((a, b) => {
							if (a.date_out < b.date_out) return 1;
							return -1;
						});

						if (withdraws[0].date_in === null) {
							res.json({ status: false });
						} else {
							res.json({ status: true });
						}
					}
				} else {
					res.status(400).json({ error: "Failed To Find Copy" });
				}
			})
			.catch((err: any) => {
				res.status(400).json({ error: "Failed To Send Request" });
			});
	};

	return {
		getAllCopies,
		addNewCopy,
		getCopyByID,
		getCopyWithdrawsByID,
		checkinCopyByID,
		checkoutCopyByID,
		checkCopyStatus,
	};
};

export = copyApi;
