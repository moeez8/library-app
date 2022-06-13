const { models } = require("../config/database");

const NewBooksTagApi = () => {
	const GetAllBooksTags = (req, res) => {
		models.books_tag
			.findAll()
			.then((tags) => {
				console.log(tags);
				res.send(tags);
			})
			.catch((err) => {
				console.log("Error: " + err);
				res.sendStatus(400);
			});
	};

	const CreateNewBooksTag = (req, res) => {
		const { book_id, tag_id } = req.body;

		models.books_tag
			.create({
				book_id,
				tag_id,
			})
			.then(() => res.send("OK"))
			.catch((err) => {
				console.log("Error: " + err);
				res.sendStatus(400);
			});
	};

	return {
		GetAllBooksTags,
		CreateNewBooksTag,
	};
};

module.exports = NewBooksTagApi;
