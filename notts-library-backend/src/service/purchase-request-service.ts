const { models } = require("../config/database");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
import sequelize from "../config/database";
import IBook from "../interfaces/IBook";
import ITag from "../interfaces/ITag";

const NewPurchaseRequestService = () => {

	const CreateNewRequest = async (book: IBook): Promise<any> => {
		// Create new book
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

		// Create new request for book
		const request = await models.request.create({
			book_id: bk.id,
			request_date: Date.now(),
			requestedBy: "TestUser"
		})
		return { book, request };
	};

	// Pulled out from create new book function (should this be here? duplicate code)
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

	const GetAllPurchaseRequests = async (): Promise<any> => {
		const result = models.request.findAll({
			include: [
				{ model: models.book, as: "book" },
			],
		});
		return result;
	};

	const SearchRequests = async (term: any): Promise<any> => {

		const result = await models.request.findAll({
			include: [
				{
					model: models.book, as: "book",
					where: {
						[Op.or]: [{ title: { [Op.like]: "%" + term + "%" } },
						{ author: { [Op.like]: "%" + term + "%" } },
						{ iban: { [Op.like]: "%" + term + "%" } },
						{ category: { [Op.like]: "%" + term + "%" } },
						{ type: { [Op.like]: "%" + term + "%" } }],
					}
				},
			],
		});
		return result;
	};

	const GetRequestByID = async (id: any): Promise<any> => {
		const request = await models.request.findByPk(id, {
			include: [
				{ model: models.book, as: "book" },
			],
		});

		if (request == null) {
			throw new Error("Unable To Find Request With ID");
		}
		return request;
	};


	const UpdateRequestByID = async (id: any, fulfill_date: any): Promise<any> => {
		const request = await models.request.findByPk(id)

		if (request == null) {
			throw new Error("Unable To Find Request With ID");
		};

		const updatedRequest = await request.update({
			fulfill_date: fulfill_date
		})

		return updatedRequest;
	};

	const DeleteRequestByID = async (id: any) => {
		const request = await models.request.findByPk(id);

		if (request == null) {
			throw new Error("Unable To Find Request With ID");
		}

		await sequelize.transaction(async () => {
			request.destroy();
		});

		return request;
	};

	return {
		CreateNewRequest,
		GetAllPurchaseRequests,
		SearchRequests,
		GetRequestByID,
		UpdateRequestByID,
		DeleteRequestByID
	};
};

export default NewPurchaseRequestService;
