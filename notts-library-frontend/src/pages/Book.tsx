import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import IBook from "../interfaces/IBook";

import Header from "../components/Header";
import BookDetails from "../components/bookDetails/BookDetails";
import BookTagList from "../components/bookDetails/BookTagList";
import BookCopyList from "../components/bookDetails/BookCopyList";

const Book = () => {
	const params = useParams();
	const [book, setbook] = useState<IBook>();
	useEffect(() => {
		getBook();
	}, []);

	const getBook = async () => {
		const result = await fetch(`http://localhost:5000/book/${params.id}`).then((response) => response.json());
		setbook(result);
	};

	return (
		<>
			<Header />
			{book ? (
				<>
					<BookDetails book={book} />
					<BookTagList book={book} />
					<BookCopyList book={book} />
				</>
			) : (
				<div className="card bg-red-200 border-2 border-red-400 ">
					<h1 className="text-lg font-bold text-red-600">No Book Found</h1>
				</div>
			)}
		</>
	);
};

export default Book;
