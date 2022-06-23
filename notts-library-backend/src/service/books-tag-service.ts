const { models } = require("../database/database");

const newBooksTagService = () => {
	const getAllBookTags = async (): Promise<any> => {
		return await models.books_tag.findAll();
	};

	const createNewBooksTag = async (book_id: any, tag_id: any): Promise<any> => {
		return await models.books_tag.create({
			book_id,
			tag_id,
		});
	};

	return { getAllBookTags, createNewBooksTag };
};

export default newBooksTagService;
