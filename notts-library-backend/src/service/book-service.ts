const { models } = require("../config/database");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

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

	return { GetAllBooks, SearchBooks };
};

export default NewBookService;
