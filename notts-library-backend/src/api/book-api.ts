const { models } = require("../config/database");
const Sequelize = require("sequelize");

//import IBook from "../../../notts-library-frontend/src/interfaces/IBook"

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
		const { title, iban, author, type, category, cover_photo, description, tags } = req.body;
		//const book: IBook = req.body;

		res.json(await NewBookService()
			.createNewBook(title, iban, author, type, category, cover_photo, description, tags));

		// models.book
		// 	.create({
		// 		title,
		// 		iban,
		// 		author,
		// 		type,
		// 		category,
		// 		cover_photo,
		// 		description,
		// 	})
		// 	.catch((err: any) => {
		// 		console.log("Error: " + err);
		// 		res.status(400).json({ error: "Failed To Send Request" });
		// 		return;
		// 	})
		// 	.then((book: any) => {
		// 		tags.map((tagObj: any) => {
		// 			return models.tag
		// 				.findOrCreate({
		// 					where: {
		// 						name: tagObj.tag_name,
		// 					},
		// 				})
		// 				.then((foundTag: any) => {
		// 					models.books_tag
		// 						.create({
		// 							book_id: book.id,
		// 							tag_id: foundTag[0].id,
		// 						})
		// 						.catch((err: any) => {
		// 							console.log("Error: " + err);
		// 							res.sendStatus(400);
		// 							return;
		// 						});
		// 				});
		// 		});
		// 		models.copy
		// 			.create({
		// 				book_id: book.id,
		// 				owner: "BJSS",
		// 			})
		// 			.catch((err: any) => {
		// 				res.status(400).send("Could Not Add A Copy");
		// 				return;
		// 			});
		// 	})
		// 	.then(() => {
		// 		res.send("OK");
		// 		return;
		// 	})
		// 	.catch((err: any) => {
		// 		res.status(400).json({ error: "Failed To Send Request" });
		// 		return;
		// 	});
	};

	const updateBookById = async (req: Request, res: Response) => {
		const { title, iban, author, type, category, cover_photo, description, tags } = req.body;

		if (req.params && req.params.id && typeof req.params.id === "string") {
			let id = parseInt(req.params.id);
			res.json(await NewBookService().updateBookByID(id, title, iban, author, type, category, cover_photo, description, tags));
			return;
		}


		// models.book
		// 	.findByPk(parseInt(req.params.id))
		// 	.then((row: any) => {
		// 		if (row) {
		// 			row.update({
		// 				title: title || row.title,
		// 				iban: iban || row.iban,
		// 				author: author || row.author,
		// 				type: type || row.type,
		// 				category: category || row.category,
		// 				cover_photo: cover_photo || row.cover_photo,
		// 				description: description || row.desciption,
		// 			});
		// 			res.send(row);
		// 		} else {
		// 			res.sendStatus(400);
		// 		}
		// 	})
		// 	.catch((err: any) => {
		// 		res.status(400).json({ error: "Failed To Send Request" });
		// 	});
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
