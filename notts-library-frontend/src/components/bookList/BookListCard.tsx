import { Link } from "react-router-dom";
import IBook from "../../interfaces/IBook";

export const BookListCard = ({ book }: { book: IBook }) => {

	const truncate = (text: String) => {
		return text.split(" ").splice(0, 40).join(" ");
	}

	return (
		<div className="card">
			<div className="m-1 break-words">
				<h1 className="text-2xl font-bold">{book.title || "Undefined"}</h1>
				<h1 className="text-lg ">{book.author ? `${book.author}` : "Author: Undefined"}</h1> <br />
				<h1 className="text-lg  ">{book.description ? `${truncate(book.description)}` : "Description: Undefined"}</h1> <br />
				<h1 className="text-lg ">{book.ISBN ? `ISBN: ${book.ISBN}` : "ISBN: Undefined"}</h1>
			</div>
			<div className="flex">
				<Link className="button" to={`/book/${book.id}`}>
					<h2>Details</h2>
				</Link>
			</div>
		</div>
	);
};

export default BookListCard;
