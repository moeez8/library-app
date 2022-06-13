const { models } = require("../config/database");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const NewBookService = () => {
	const SearchBooks = (term) => {
		if (term != null) {
			models.book
				.findAll({
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
				})
				.then((books) => {
					return "books";
				})
				.catch(() => {
					return "[]";
				});
		} else {
			models.book
				.findAll({
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
				})
				.then((books) => {
					console.log(books);
					return "books";
				})
				.catch((err) => {
					return "[]";
				});
		}
	};

	return { SearchBooks };
};

module.exports = NewBookService;
