import { IBook } from "./BookCard";
import Tag from "./Tag";

const BookTags = (book: IBook) => {
	let renderedCopies;
	if (book.tags) {
		renderedCopies = book.tags.map((tag) => {
			return <Tag key={tag.id} tag={tag.tag} />;
		});
	}

	return (
		<div className="card">
			<h1 className="text-lg font-bold">{book.tags ? `Tags: ${book.tags.length}` : "Tags: 0"}</h1>
			<div className="flex">{renderedCopies}</div>
		</div>
	);
};

export default BookTags;
