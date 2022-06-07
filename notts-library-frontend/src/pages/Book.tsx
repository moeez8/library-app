import Header from "../components/Header";
import BookDetails from "../components/BookDetails";
import BookTags from "../components/BookTags";
import BookCopies from "../components/BookCopies";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { IBook } from "../components/BookCard";

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
					<BookDetails {...book} />
					<BookTags {...book} />
					<BookCopies {...book} />
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
