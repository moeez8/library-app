const { models } = require("../config/database");
const Sequelize = require("sequelize");

import IBook from "../interfaces/IBook"

import NewBookService from "../service/book-service";

import { Request, Response } from "express";

const bookApi = () => {
	const searchForBook = async (req: Request, res: Response) => {
		const { term } = req.query;
		if (term != null) {
			res.json(await NewBookService().SearchBooks(term));
		} else {
			res.json(await NewBookService().GetAllBooks());
		}
	};

	const getBookById = async (req: Request, res: Response) => {
		if (req.params && req.params.id && typeof req.params.id === "string") {
			let id = parseInt(req.params.id);
			res.json(await NewBookService().GetBookByID(id));
			return;
		}
	};

	const createNewBook = async (req: Request, res: Response) => {
		const book: IBook = req.body;

		res.json(await NewBookService()
			.createNewBook(book)
		);
	};

	const updateBookById = async (req: Request, res: Response) => {
		const { title, iban, author, type, category, cover_photo, description, tags } = req.body;

		if (req.params && req.params.id && typeof req.params.id === "string") {
			let id = parseInt(req.params.id);
			res.json(await NewBookService().updateBookByID(id, title, iban, author, type, category, cover_photo, description, tags));
			return;
		}
	};

	const getCopiesByBookId = async (req: Request, res: Response) => {

		if (req.params && req.params.id && typeof req.params.id === "string") {
			let id = parseInt(req.params.id);
			res.json(await NewBookService().getCopiesByBookID(id));
			return;
		}
	};

	const getTagsByBookId = async (req: Request, res: Response) => {

		if (req.params && req.params.id && typeof req.params.id === "string") {
			let id = parseInt(req.params.id);
			res.json(await NewBookService().getTagsByBookID(id));
			return;
		}
	};

	const deleteBookById = async (req: Request, res: Response) => {
		const Id = req.params.id;
		const book = await models.book.findByPk(Id);
		res.json(await NewBookService().deleteBookByID(book));
		return;

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

export = bookApi;
