import { NextFunction, Request, Response } from "express";
import IBook from "../interfaces/IBook";
import ApiError from "../middleware/api-error";
import IBookService from "../service/interfaces/IBook-Service";

const newBookApi = (bookService: IBookService) => {
	const searchForBook = async (req: Request, res: Response, next: NextFunction) => {
		const { term } = req.query;

		if (term != null) {
			try {
				res.json(await bookService.searchBooks(term as string));
				return;
			} catch (error: any) {
				next(ApiError.Internal(error.toString()));
				return;
			}
		} else {
			try {
				res.json(await bookService.getAllBooks());
				return;
			} catch (error: any) {
				next(ApiError.Internal(error.toString()));
				return;
			}
		}
	};

	const getBookById = async (req: Request, res: Response, next: NextFunction) => {
		const id: number = parseInt(req.params.id);

		if (id == null) {
			next(ApiError.BadRequest("Please Fill URL Param id"));
			return;
		}

		try {
			res.json(await bookService.getBookByID(id));
			return;
		} catch (error: any) {
			next(ApiError.Internal(error.toString()));
			return;
		}
	};

	const createNewBook = async (req: Request, res: Response, next: NextFunction) => {
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
			res.json(await bookService.createNewBook(book));
			return;
		} catch (error: any) {
			next(ApiError.Internal(error.toString()));
			return;
		}
	};

	const updateBookById = async (req: Request, res: Response, next: NextFunction) => {
		const { title, iban, author, type, category, cover_photo, description, tags } = req.body;

		const id: number = parseInt(req.params.id);

		if (id == null) {
			next(ApiError.BadRequest("Please Fill URL Param id"));
			return;
		}

		try {
			res.json(await bookService.updateBookByID(id, title, iban, author, type, category, cover_photo, description, tags));
			return;
		} catch (error: any) {
			next(ApiError.Internal(error.toString()));
			return;
		}
	};

	const getCopiesByBookId = async (req: Request, res: Response, next: NextFunction) => {
		const id: number = parseInt(req.params.id);

		if (id == null) {
			next(ApiError.BadRequest("Please Fill URL Param id"));
			return;
		}

		try {
			res.json(await bookService.getCopiesByBookID(id));
			return;
		} catch (error: any) {
			next(ApiError.Internal(error.toString()));
			return;
		}
	};

	const getTagsByBookId = async (req: Request, res: Response, next: NextFunction) => {
		const id: number = parseInt(req.params.id);

		if (id == null) {
			next(ApiError.BadRequest("Please Fill URL Param id"));
			return;
		}

		try {
			res.json(await bookService.getTagsByBookID(id));
			return;
		} catch (error: any) {
			next(ApiError.Internal(error.toString()));
			return;
		}
	};

	const deleteBookById = async (req: Request, res: Response, next: NextFunction) => {
		const id: number = parseInt(req.params.id);

		if (id == null) {
			next(ApiError.BadRequest("Please Fill URL Param id"));
			return;
		}

		try {
			res.json(await bookService.deleteBookByID(id));
			return;
		} catch (error: any) {
			next(ApiError.Internal(error.toString()));
			return;
		}
	};

	return {
		searchForBook,
		getBookById,
		createNewBook,
		updateBookById,
		getCopiesByBookId,
		getTagsByBookId,
		deleteBookById,
	};
};

export = newBookApi;
