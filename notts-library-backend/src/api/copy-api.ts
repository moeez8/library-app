const { models } = require("../config/database");
import { NextFunction, Request, Response } from "express";
import ApiError from "../middleware/api-error";
import CopyService from "../service/copy-service";

const copyApi = () => {
	const addNewCopy = async (req: Request, res: Response, next: NextFunction) => {
		const { book_id, owner } = req.body;

		const errors = [];
		if (book_id == null) errors.push("Please Provide Body Param book_id");
		if (owner == null) errors.push("Please Provide Body Param owner");

		if (errors.length > 0) {
			next(ApiError.BadRequest(errors));
			return;
		}

		//Find Book Model

		try {
			res.json(await CopyService().AddNewCopy(book_id, owner));
		} catch (error: any) {
			next(ApiError.Internal(error.toString()));
			return;
		}
	};

	const getAllCopies = async (req: Request, res: Response, next: NextFunction) => {
		try {
			res.json(await CopyService().GetAllCopies());
		} catch (error: any) {
			next(ApiError.Internal(error.toString()));
			return;
		}
	};

	const getCopyByID = async (req: Request, res: Response, next: NextFunction) => {
		const id: number = parseInt(req.params.id);

		if (id == null) {
			next(ApiError.BadRequest("Please Fill URL Param id"));
			return;
		}

		try {
			res.json(await CopyService().GetCopyByID(id));
			return;
		} catch (error: any) {
			next(ApiError.Internal(error.toString()));
			return;
		}
	};

	const getCopyWithdrawsByID = async (req: Request, res: Response, next: NextFunction) => {
		const id: number = parseInt(req.params.id);

		if (id == null) {
			next(ApiError.BadRequest("Please Fill URL Param id"));
			return;
		}

		try {
			res.json(await CopyService().GetWithdrawsByCopyID(id));
			return;
		} catch (error: any) {
			next(ApiError.Internal(error.toString()));
			return;
		}
	};

	const checkinCopyByID = async (req: Request, res: Response, next: NextFunction) => {
		const id: number = parseInt(req.params.id);

		if (id == null) {
			next(ApiError.BadRequest("Please Fill URL Param id"));
			return;
		}

		try {
			res.json(await CopyService().CheckinCopyByID(id));
			return;
		} catch (error: any) {
			next(ApiError.Internal(error.toString()));
			return;
		}
	};

	const checkoutCopyByID = async (req: Request, res: Response, next: NextFunction) => {
		const id: number = parseInt(req.params.id);

		if (id == null) {
			next(ApiError.BadRequest("Please Fill URL Param id"));
			return;
		}

		const { name } = req.body;

		const errors = [];
		if (name == null) errors.push("Please Provide Body Param name");

		if (errors.length > 0) {
			next(ApiError.BadRequest(errors));
			return;
		}

		try {
			res.json(await CopyService().CheckoutCopyByID(id, name));
			return;
		} catch (error: any) {
			next(ApiError.Internal(error.toString()));
			return;
		}
	};

	const checkCopyStatus = async (req: Request, res: Response, next: NextFunction) => {
		const id: number = parseInt(req.params.id);

		if (id == null) {
			next(ApiError.BadRequest("Please Fill URL Param id"));
			return;
		}

		try {
			res.json(await CopyService().CheckCopyStatus(id));
			return;
		} catch (error: any) {
			next(ApiError.Internal(error.toString()));
			return;
		}
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
