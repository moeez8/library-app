const { models } = require("../config/database");
import { Request, Response } from "express";

const copyApi = () => {
	const getAllCopies = (req: Request, res: Response) => {
		models.copy
			.findAll()
			.then((copies: any) => {
				res.send(copies);
			})
			.catch((err: any) => {
				res.status(400).send("Could Not Find Any Copies");
			});
	};

	const addNewCopy = (req: Request, res: Response) => {
		const { book_id, owner } = req.body;

		if (book_id == null) {
			res.status(400).json({ error: "Missing Property book_id" });
			return;
		}
		if (owner == null) {
			res.status(400).json({ error: "Missing Property owner" });
			return;
		}

		models.copy
			.create({
				book_id,
				owner,
			})
			.then((row: any) => res.send(row))
			.catch((err: any) => {
				res.status(400).send("Could Not Add A Copy");
			});
	};

	const getCopyByID = (req: Request, res: Response) => {
		models.copy
			.findByPk(parseInt(req.params.id))
			.then((row: any) => {
				if (row) {
					res.send(row);
				} else {
					res.status(400).json({ error: "Could Not Find A Copy" });
				}
			})
			.catch((err: any) => {
				res.status(400).send("Could Not Find A Copy");
			});
	};

	const getCopyWithdrawsByID = (req: Request, res: Response) => {
		models.copy
			.findByPk(parseInt(req.params.id), {
				include: [{ model: models.withdraw, as: "withdraws" }],
			})
			.then((row: any) => {
				res.send(row.withdraws);
			})
			.catch((err: any) => {
				res.status(400).send("Could Not Find Copy");
			});
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
