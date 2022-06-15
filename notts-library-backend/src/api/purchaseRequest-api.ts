const { models } = require("../config/database");
import { NextFunction, Request, Response } from "express";

import NewPurchaseRequestService from "../service/purchase-request-service";

import IBook from "../interfaces/IBook";
import ApiError from "../middleware/api-error";

const purchaseRequestApi = () => {

	const addRequest = async (req: Request, res: Response, next: NextFunction) => {
		const book: IBook = req.body;

		const errors = [];

		if (book.title == null) errors.push("Please Provide Body Param title");
		if (book.iban == null) errors.push("Please Provide Body Param iban");
		if (book.author == null) errors.push("Please Provide Body Param author");
		// if (book.type == null) errors.push("Please Provide Body Param type");
		// if (book.category == null) errors.push("Please Provide Body Param category");
		if (book.description == null) errors.push("Please Provide Body Param description");

		if (errors.length > 0) {
			next(ApiError.BadRequest(errors));
			return;
		}

		try {
			res.json(await NewPurchaseRequestService().CreateNewRequest(book));
			return;
		} catch (error: any) {
			next(ApiError.Internal(error.toString()));
			return;
		}
	};

	// const getAllRequests = async (req: Request, res: Response) => {
	// 	res.json(await NewPurchaseRequestService().GetAllPurchaseRequests());
	// };

	const searchForRequest = async (req: Request, res: Response, next: NextFunction) => {
		const { term } = req.query;

		if (term != null) {
			try {
				res.json(await NewPurchaseRequestService().SearchRequests(term));
				return;
			} catch (error: any) {
				next(ApiError.Internal(error.toString()));
				return;
			}
		} else {
			try {
				res.json(await NewPurchaseRequestService().GetAllPurchaseRequests());
				return;
			} catch (error: any) {
				next(ApiError.Internal(error.toString()));
				return;
			}
		}
	};

	const getRequestByID = async (req: Request, res: Response, next: NextFunction) => {
		const id: number = parseInt(req.params.id);

		if (id == null) {
			next(ApiError.BadRequest("Please Fill URL Param id"));
			return;
		}

		try {
			res.json(await NewPurchaseRequestService().GetRequestByID(id));
			return;
		} catch (error: any) {
			next(ApiError.Internal(error.toString()));
			return;
		}
	};

	const updateRequestByID = async (req: Request, res: Response, next: NextFunction) => {
		const fulfill_date = Date.now();

		const id: number = parseInt(req.params.id);

		if (id == null) {
			next(ApiError.BadRequest("Please Fill URL Param id"));
			return;
		}

		try {
			res.json(await NewPurchaseRequestService().UpdateRequestByID(id, fulfill_date));
			return;
		} catch (error: any) {
			next(ApiError.Internal(error.toString()));
			return;
		}
	};

	const fulfillRequestByID = async (req: Request, res: Response, next: NextFunction) => {
		const id: number = parseInt(req.params.id);

		if (id == null) {
			next(ApiError.BadRequest("Please Fill URL Param id"));
			return;
		}

		try {
			res.json(await NewPurchaseRequestService().FulfillRequestByID(id));
			return;
		} catch (error: any) {
			next(ApiError.Internal(error.toString()));
			return;
		}
	};

	return {
		addRequest,
		searchForRequest,
		//getAllRequests,
		getRequestByID,
		updateRequestByID,
		fulfillRequestByID
	};
};

export = purchaseRequestApi;
