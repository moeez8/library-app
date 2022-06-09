import BookListCard from "../bookList/BookListCard";
import IBook from "../../interfaces/IBook";
import { useState, useEffect } from "react";

const SearchBookList = ({ searchTerm }: { searchTerm?: string }) => {
	// The Array Of Books Objects
	const [books, setbooks] = useState<IBook[]>([]);

	// Update The List Of Books On Load
	useEffect(() => {
		getBooks();
	}, [searchTerm]);

	const getBooks = async () => {
		if (searchTerm) {
			const result = await fetch(`http://localhost:5000/book/?term=${searchTerm}`).then((response) => response.json());
			setbooks(result);
		} else {
			const result = await fetch(`http://localhost:5000/book/`).then((response) => response.json());
			setbooks(result);
		}
	};

	const renderedItems = books.map((book) => {
		return <BookListCard key={book.id} book={book} />;
	});

	return (
		<div className="card">
			<h1 className="text-xl font-bold m-1">{`Total Books: ${renderedItems.length}`}</h1>
			{renderedItems}
		</div>
	);
};

export default SearchBookList;
