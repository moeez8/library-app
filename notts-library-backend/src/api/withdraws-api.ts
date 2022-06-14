const { models } = require("../config/database");
import { Request, Response } from "express";
import NewWithdrawService from "../service/withdraw-service";

const NewWithdrawsApi = () => {
	const GetAllWithdraws = async (req: Request, res: Response) => {
		res.json(await NewWithdrawService().GetAllWithdraws());
	};

	const CreateNewWithdraw = async (req: Request, res: Response) => {
		let { copy_id, user_name } = req.body;

		if (copy_id == null) {
			res.status(400).json({ error: "Please Provide Body Param 'copy_id'" });
			return;
		}

		if (user_name == null) {
			res.status(400).json({ error: "Please Provide Body Param 'user_name'" });
			return;
		}

		res.json(await NewWithdrawService().CreateNewWithdraw(copy_id, user_name));
		return;
	};

	const GetWithdrawById = async (req: Request, res: Response) => {
		const id = req.params.id;

		if (id != null) {
			res.json(await NewWithdrawService().GetWithdrawByID(id));
			return;
		} else {
			res.status(400).json({ error: "Invalid Param 'user_name'" });
			return;
		}
	};

	return { GetAllWithdraws, CreateNewWithdraw, GetWithdrawById };
};

export = NewWithdrawsApi;
