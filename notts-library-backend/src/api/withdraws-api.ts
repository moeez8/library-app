import { NextFunction, Request, Response } from "express";

import newWithdrawService from "../service/withdraw-service";
import ApiError from "../middleware/api-error";

const newWithdrawsApi = () => {
	const withdrawService = newWithdrawService();

	const getAllWithdraws = async (req: Request, res: Response) => {
		res.json(await newWithdrawService().getAllWithdraws());
	};

	const createNewWithdraw = async (req: Request, res: Response, next: NextFunction) => {
		let { copy_id, user_name } = req.body;

		if (copy_id == null) {
			next(ApiError.BadRequest("Please Fill Body Param copy_id"));
			return;
		}

		if (user_name == null) {
			next(ApiError.BadRequest("Please Fill Body Param user_name"));
			return;
		}

		try {
			res.json(await withdrawService.createNewWithdraw(copy_id, user_name));
			return;
		} catch (error: any) {
			next(ApiError.Internal(error.toString()));
			return;
		}
	};

	const getWithdrawById = async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;

		try {
			res.json(await withdrawService.getWithdrawByID(id));
			return;
		} catch (error: any) {
			next(ApiError.Internal(error.toString()));
			return;
		}
	};

	return { getAllWithdraws, createNewWithdraw, getWithdrawById };
};

export = newWithdrawsApi;
