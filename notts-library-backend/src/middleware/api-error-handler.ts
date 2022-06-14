import { Request, Response, NextFunction } from "express";
import ApiError from "./api-error";

const ApiErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
	console.error(err);

	if (err instanceof ApiError) {
		res.status(err.code).json(err.message);
		return;
	}

	res.status(500).json("Somthing Went Wrong");
};

export default ApiErrorHandler;
