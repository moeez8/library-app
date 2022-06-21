import { useState, useEffect } from "react";

import IBook from "../../interfaces/IBook";
import ICopy from "../../interfaces/ICopy";
import BookCopy from "./BookCopy";

const BookCopyList = ({ book }: { book: IBook }) => {
	const [copies, setCopies] = useState<ICopy[]>();
	useEffect(() => {
		getBook();
	}, []);

	const getBook = async () => {
		const res = await fetch(process.env.REACT_APP_BASE_URL + `/book/${book.id}/copies`, { method: "GET" });
		const data = await res.json();
		setCopies(data.copies);
	};

	const renderedCopies = copies?.map((copy) => {
		return <BookCopy key={copy.id} copy={copy} />;
	});

	return (
		<div className="card">
			<h1 className="text-lg font-bold">{copies ? `Copies: ${copies.length}` : "Copies: 0"}</h1>
			{renderedCopies}
		</div>
	);
};

export default BookCopyList;
