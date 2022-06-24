import { NextFunction, Request, Response } from "express";

import newPurchaseRequestService from "../service/purchase-request-service";

import IBook from "../interfaces/IBook";
import ApiError from "../middleware/api-error";

const purchaseRequestApi = () => {
	const purchaseRequestService = newPurchaseRequestService();

	const addRequest = async (req: Request, res: Response, next: NextFunction) => {
		const book: IBook = req.body;

		const errors = [];

		if (book.title == null) errors.push("Please Provide Body Param title");
		if (book.ISBN == null) errors.push("Please Provide Body Param ISBN");
		if (book.author == null) errors.push("Please Provide Body Param author");
		if (book.description == null) errors.push("Please Provide Body Param description");

		if (errors.length > 0) {
			next(ApiError.BadRequest(errors));
			return;
		}

		try {
			res.json(await purchaseRequestService.createNewRequest(book));
			return;
		} catch (error: any) {
			next(ApiError.Internal(error.toString()));
			return;
		}
	};

	const searchForRequest = async (req: Request, res: Response, next: NextFunction) => {
		const { term } = req.query;

		if (term != null) {
			try {
				res.json(await purchaseRequestService.searchRequests(term));
				return;
			} catch (error: any) {
				next(ApiError.Internal(error.toString()));
				return;
			}
		} else {
			try {
				res.json(await purchaseRequestService.getAllPurchaseRequests());
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
			res.json(await purchaseRequestService.getRequestByID(id));
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
			res.json(await purchaseRequestService.updateRequestByID(id, fulfill_date));
			return;
		} catch (error: any) {
			next(ApiError.Internal(error.toString()));
			return;
		}
	};

	const fulfillRequestByID = async (req: Request, res: Response, next: NextFunction) => {
		const id: number = parseInt(req.params.id);
		const { owner } = req.body

		if (id == null) {
			next(ApiError.BadRequest("Please Fill URL Param id"));
			return;
		}

		if (owner == null) {
			next(ApiError.BadRequest("Please provide a name to fulfill this request"));
			return;
		}

		try {
			res.json(await purchaseRequestService.fulfillRequestByID(id, owner));
			return;
		} catch (error: any) {
			next(ApiError.Internal(error.toString()));
			return;
		}
	};

	const deleteRequestByID = async (req: Request, res: Response, next: NextFunction) => {
		const id: number = parseInt(req.params.id);

		if (id == null) {
			next(ApiError.BadRequest("Please Fill URL Param id"));
			return;
		}

		try {
			res.json(await purchaseRequestService.deleteRequestByID(id));
			return;
		} catch (error: any) {
			next(ApiError.Internal(error.toString()));
			return;
		}
	};

	return {
		addRequest,
		searchForRequest,
		getRequestByID,
		updateRequestByID,
		fulfillRequestByID,
		deleteRequestByID,
	};
};

export = purchaseRequestApi;
