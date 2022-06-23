import IBook from "../../interfaces/IBook";
import ReadMoreReact from 'read-more-react';

const BookDetails = ({ book }: { book: IBook }) => {
	return (
		<div className="card break-words">
			< h1 className="text-2xl font-bold" > {book.title || "Undefined"}</h1 >
			<h1 className="text-lg">{book.author ? `${book.author}` : "Author: Undefined"}</h1> <br />
			<h1 className="text-lg"> {book.description ? `${book.description}` : "Description: Undefined"}</h1> <br />
			<h1 className="text-lg">{book.ISBN ? `ISBN: ${book.ISBN}` : "ISBN: Undefined"}</h1>
		</div >
	);
};

export default BookDetails;
