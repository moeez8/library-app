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
			const res = await fetch(process.env.REACT_APP_BASE_URL + `/book/?term=${searchTerm}`);
			const data = await res.json();
			setbooks(data);
		} else {
			const res = await fetch(process.env.REACT_APP_BASE_URL + "/book/");
			const data = await res.json();
			setbooks(data);
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
