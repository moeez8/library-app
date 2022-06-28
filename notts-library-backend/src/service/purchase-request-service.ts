const { models } = require("../database/database");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;
import sequelize from "../database/database";
import IBook from "../interfaces/IBook";
import ITag from "../interfaces/ITag";

const newPurchaseRequestService = () => {
	const createNewRequest = async (newBookDetails: IBook): Promise<any> => {
		let book: any;
		let tags: any;
		let bookRequest: any;

		await sequelize.transaction(async () => {
			const [bk, created] = await models.book.findOrCreate({
				where: {
					ISBN: newBookDetails.ISBN,
				},
				defaults: {
					title: newBookDetails.title,
					ISBN: newBookDetails.ISBN,
					author: newBookDetails.author,
					description: newBookDetails.description,
				},
			});

			book = bk;

			if (newBookDetails.tags) {
				tags = await createTags(bk.id, newBookDetails.tags);
			}

			// Create new request for book
			const request = await models.request.create({
				book_id: bk.id,
				request_date: Date.now(),
				requestedBy: newBookDetails.user,
			});

			bookRequest = request
		});


		return { book, bookRequest };
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
		});

		return { createdTags, associations };
	};

	const getAllPurchaseRequests = async (): Promise<any> => {
		const result = models.request.findAll({
			order: [["request_date", "DESC"]],
			include: [{ model: models.book, as: "book" }],
			where: {
				fulfill_date: { [Op.is]: null },
			},
		});
		return result;
	};

	const searchRequests = async (term: any): Promise<any> => {
		let result = await models.book.findAll({
			include: [{ model: models.request, as: "requests" }],
		});

		result = result.filter((book: any) => {
			return book.requests.length > 0;
		});

		return result;
	};

	const getRequestByID = async (id: any): Promise<any> => {
		const request = await models.request.findByPk(id, {
			include: [{ model: models.book, as: "book" }],
			paranoid: false,
		});

		if (request == null) {
			throw new Error("Unable To Find Request With ID");
		}
		return request;
	};

	const updateRequestByID = async (id: any, fulfill_date: any): Promise<any> => {
		return await sequelize.transaction(async () => {
			const request = await models.request.findByPk(id, {
				where: {
					fulfill_date: { [Op.is]: null },
				},
			});

			if (request == null) {
				throw new Error("Unable To Find Request With ID");
			}

			if (request.fulfill_date) {
				throw new Error("Request Already Fullfilled");
			}

			const updatedRequest = await request.update({
				fulfill_date: fulfill_date,
			});

			return updatedRequest;
		});
	};

	const fulfillRequestByID = async (id: any, name: any) => {
		const request = await models.request.findByPk(id, {
			where: {
				fulfill_date: { [Op.is]: null },
			},
		});

		if (request == null) throw new Error("Unable To Find Request With ID");

		if (request.fulfill_date) throw new Error("Request Already Fullfilled");

		await models.copy.create({
			book_id: request.book_id,
			owner: name,
		});

		const updatedRequest = await request.update({
			fulfill_date: Date.now(),
		});

		return updatedRequest;
	};

	const deleteRequestByID = async (id: any) => {
		const request = await models.request.findByPk(id);

		await sequelize.transaction(async () => {
			request.destroy();
		});

		return request;
	};

	return {
		createNewRequest,
		getAllPurchaseRequests,
		searchRequests,
		getRequestByID,
		updateRequestByID,
		fulfillRequestByID,
		deleteRequestByID,
	};
};

export default newPurchaseRequestService;
