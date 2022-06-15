const { models } = require("../config/database");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

import IBook from "../interfaces/IBook";
import ITag from "../interfaces/ITag";

const NewBookService = () => {
	const SearchBooks = async (term: any): Promise<any> => {
		const result = await models.book.findAll({
			where: {
				[Op.or]: [{ title: { [Op.like]: "%" + term + "%" } }, { author: { [Op.like]: "%" + term + "%" } }, { iban: { [Op.like]: "%" + term + "%" } }, { category: { [Op.like]: "%" + term + "%" } }, { type: { [Op.like]: "%" + term + "%" } }],
			},
			include: [
				{ model: models.copy, as: "copies" },
				{
					model: models.tag,
					as: "tags",
					through: {
						attributes: ["tag_id", "book_id"],
					},
				},
			],
		});
		return result;
	};

	const GetAllBooks = async (): Promise<any> => {
		const result = await models.book.findAll({
			include: [
				{ model: models.copy, as: "copies" },
				{
					model: models.tag,
					as: "tags",
					through: {
						attributes: ["tag_id", "book_id"],
					},
				},
			],
		});
		return result;
	};

	const GetBookByID = async (id: any): Promise<any> => {
		const result = await models.book.findByPk(id);

		if (result == null) {
			throw new Error("Unable To Find Book With ID");
		}

		return result;
	};

	const createNewBook = async (book: IBook): Promise<any> => {
		const bk = await models.book.create({
			title: book.title,
			iban: book.iban,
			author: book.author,
			type: book.type,
			category: book.category,
			cover_photo: book.cover_photo,
			description: book.description,
		});

		let tags;
		if (book.tags) {
			tags = await createTags(bk.id, book.tags);
		}

		const copy = await createCopy(bk.id);

		return { book, copy, tags };
	};

	// Pulled out from create new book function
	const createCopy = async (id: any): Promise<any> => {
		const copy = await models.copy.create({
			book_id: id,
			owner: "BJSSTest",
		});
		return copy;
	};

	// Pulled out from create new book function
	const createTags = async (id: any, tags: ITag[]): Promise<any> => {
		const createdTags: any[] = [];
		const associations: any[] = [];

		tags.forEach(async (tagObj: any) => {
			const createdTag = await models.tag.findOrCreate({
				where: {
					name: tagObj.tag_name,
				},
			});

			const association = await models.books_tag.create({
				book_id: id,
				tag_id: createdTag[0].id,
			});

			createdTags.push(createdTag[0]);
			associations.push(association);
			//console.log(associations)
		});
		console.log(associations);

		return { createdTags, associations };
	};

	const updateBookByID = async (id: any, title: any, iban: any, author: any, type: any, category: any, cover_photo: any, description: any, tags: any) => {
		models.book.findByPk(id).then((row: any) => {
			if (row) {
				row.update({
					title: title || row.title,
					iban: iban || row.iban,
					author: author || row.author,
					type: type || row.type,
					category: category || row.category,
					cover_photo: cover_photo || row.cover_photo,
					description: description || row.description,
				});
			}
		});

		//CURRENTLY DOES NOT DELETE ALREADY EXISTING TAGS
		tags.map((tagObj: any) => {
			return models.tag
				.findOrCreate({
					where: {
						name: tagObj.tag_name,
					},
				})
				.then((foundTag: any) => {
					models.books_tag.create({
						book_id: id,
						tag_id: foundTag[0].id,
					});
				});
		});
	};

	const getCopiesByBookID = async (id: any) => {
		const result = models.book.findByPk(parseInt(id), {
			include: [{ model: models.copy, as: "copies" }],
		});

		return result;
	};

	const getTagsByBookID = async (id: any) => {
		const result = models.book.findByPk(parseInt(id), {
			include: [
				{
					model: models.tag,
					as: "tags",
					through: {
						attributes: ["tag_id", "book_id"],
					},
				},
			],
		});

		return result;
	};

	const deleteBookByID = async (book: any) => {
		if (book !== null) {
			book.destroy();
			// res.status(200).json({ msg: "Book Deleted" });
			return;
		} else {
			// res.status(400).json({ error: "Not Able To Find Book With ID" });
			return;
		}
	};

	return {
		GetAllBooks,
		SearchBooks,
		GetBookByID,
		createNewBook,
		updateBookByID,
		getCopiesByBookID,
		getTagsByBookID,
		deleteBookByID
	};
};

export default NewBookService;
