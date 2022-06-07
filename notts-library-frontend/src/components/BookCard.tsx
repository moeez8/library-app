import { Link } from "react-router-dom";

export interface IBook {
	id?: string;
	title?: string;
	author?: string;
	description?: string;
	iban?: string;
	copies?: ICopy[];
	tags?: ITag[];
}

export interface ICopy {
	id?: string;
	bookId?: string;
	owner?: string;
}

export interface ITag {}

export const BookCard = (book: IBook) => {
	return (
		<div className="card">
			<div className="m-1">
				<h1 className="text-lg font-bold">{book.title || "Undefined"}</h1>
				<h1>{book.author ? `Author: ${book.author}` : "Author: Undefined"}</h1>
				<h1>{book.description ? `Description: ${book.description}` : "Description: Undefined"}</h1>
				<h1>{book.iban ? `IBAN: ${book.iban}` : "IBAN: Undefined"}</h1>
			</div>
			<div className="flex">
				<Link className="button" to={`/book/${book.id}`}>
					<h2>Home</h2>
				</Link>
			</div>
		</div>
	);
};

export default BookCard;
