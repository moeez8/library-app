import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import IBook from "../interfaces/IBook";

import Header from "../components/Header";
import BookDetails from "../components/bookDetails/BookDetails";
import BookTagList from "../components/bookDetails/BookTagList";
import BookCopyList from "../components/bookDetails/BookCopyList";
import BookAdminControls from "../components/bookDetails/BookAdminControls";
import RecordDeleted from "../components/RecordDeleted";

const Book = () => {
	const params = useParams();
	const [book, setbook] = useState<IBook>();
	useEffect(() => {
		getBook();
	}, []);

	const getBook = async () => {
		const res = await fetch(process.env.REACT_APP_BASE_URL + `/book/${params.id}`);
		if (res.status == 200) {
			setbook(await res.json());
		}
	};

	return (
		<>
			<Header />
			{book ? (
				<>
					{book.deletedAt ? <RecordDeleted /> : null}
					<BookDetails book={book} />
					<BookTagList book={book} />
					<BookCopyList book={book} />
					{book.deletedAt ? null : <BookAdminControls book={book} />}
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
