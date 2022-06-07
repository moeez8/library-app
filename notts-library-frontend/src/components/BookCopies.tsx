import { IBook } from "./BookCard";
import BookCopyDetails from "./BookCopyDetails";

const BookCopies = (book: IBook) => {
	let renderedCopies;
	if (book.copies) {
		renderedCopies = book.copies.map((copy) => {
			return <BookCopyDetails key={copy.id} {...copy} />;
		});
	}

	return (
		<div className="card">
			<h1 className="text-lg font-bold">{book.copies ? `Copies: ${book.copies.length}` : "Copies: 0"}</h1>
			{renderedCopies}
		</div>
	);
};

export default BookCopies;
