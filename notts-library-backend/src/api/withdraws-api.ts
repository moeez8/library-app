import { NextFunction, Request, Response } from "express";
import ApiError from "../middleware/api-error";
import NewWithdrawService from "../service/withdraw-service";

const NewWithdrawsApi = () => {
	const GetAllWithdraws = async (req: Request, res: Response) => {
		res.json(await NewWithdrawService().GetAllWithdraws());
	};

	const CreateNewWithdraw = async (req: Request, res: Response, next: NextFunction) => {
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
			res.json(await NewWithdrawService().CreateNewWithdraw(copy_id, user_name));
			return;
		} catch (error: any) {
			next(ApiError.Internal(error.toString()));
			return;
		}
	};

	const GetWithdrawById = async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;

		try {
			res.json(await NewWithdrawService().GetWithdrawByID(id));
			return;
		} catch (error: any) {
			next(ApiError.Internal(error.toString()));
			return;
		}
	};

	return { GetAllWithdraws, CreateNewWithdraw, GetWithdrawById };
};

export = NewWithdrawsApi;
