const { models } = require("../config/database");

const NewBooksTagService = () => {
	const GetAllBookTags = async (): Promise<any> => {
		return await models.books_tag.findAll();
	};

	const CreateNewBooksTag = async (book_id: any, tag_id: any): Promise<any> => {
		return await models.books_tag.create({
			book_id,
			tag_id,
		});
	};

	return { GetAllBookTags, CreateNewBooksTag };
};

export default NewBooksTagService;
