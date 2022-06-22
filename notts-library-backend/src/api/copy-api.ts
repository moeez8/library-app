import { NextFunction, Request, Response } from "express";
import ApiError from "../middleware/api-error";
import newCopyService from "../service/copy-service";

const copyApi = () => {
	const copyService = newCopyService();

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
			res.json(await copyService.addNewCopy(book_id, owner));
		} catch (error: any) {
			next(ApiError.Internal(error.toString()));
			return;
		}
	};

	const getAllCopies = async (req: Request, res: Response, next: NextFunction) => {
		try {
			res.json(await copyService.getAllCopies());
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
			res.json(await copyService.getCopyByID(id));
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
			res.json(await copyService.getWithdrawsByCopyID(id));
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
			res.json(await copyService.checkinCopyByID(id));
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
			res.json(await copyService.checkoutCopyByID(id, name));
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
			res.json(await copyService.checkCopyStatus(id));
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
