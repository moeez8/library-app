const { models } = require("../config/database");

const NewBooksTagApi = () => {
	const GetAllBooksTags = (req: any, res: any) => {
		models.books_tag
			.findAll()
			.then((tags: any) => {
				console.log(tags);
				res.send(tags);
			})
			.catch((err: any) => {
				console.log("Error: " + err);
				res.sendStatus(400);
			});
	};

	const CreateNewBooksTag = (req: any, res: any) => {
		const { book_id, tag_id } = req.body;

		models.books_tag
			.create({
				book_id,
				tag_id,
			})
			.then(() => res.send("OK"))
			.catch((err: any) => {
				console.log("Error: " + err);
				res.sendStatus(400);
			});
	};

	return {
		GetAllBooksTags,
		CreateNewBooksTag,
	};
};

export = NewBooksTagApi;
