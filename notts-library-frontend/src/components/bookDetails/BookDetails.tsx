import IBook from "../../interfaces/IBook";
import ReadMoreReact from 'read-more-react';

const BookDetails = ({ book }: { book: IBook }) => {
	return (
		<div className="card">
			<div className="flex">
				<div className="break-words">
					<h1 className="text-2xl font-bold" > {book.title || "Undefined"}</h1 >
					<h1 className="text-lg">{book.author ? `${book.author}` : "Author: Undefined"}</h1> <br />
					<h1 className="text-lg"> {book.description ? `${book.description}` : "Description: Undefined"}</h1> <br />
					<h1 className="text-lg">{book.ISBN ? `ISBN: ${book.ISBN}` : "ISBN: Undefined"}</h1>
				</div >
				<div className="flex-none self-center">
					{/* No image will be displayed if API does not have image, could potentially have a placeholder */}
					<img src={`https://covers.openlibrary.org/b/ISBN/${book.ISBN}-M.jpg`} />
				</div>
			</div>
		</div>
	);
};

export default BookDetails;
