import { useState, useEffect } from "react";
import IBook from "../../interfaces/IBook";
import ITag from "../../interfaces/ITag";
import Tag from "./Tag";

const BookTagsList = ({ book }: { book: IBook }) => {
	const [tags, setTags] = useState<ITag[]>();
	useEffect(() => {
		getBook();
	}, []);

	const getBook = async () => {
		const result = await fetch(`http://localhost:5000/book/${book.id}/tags`).then((response) => response.json());
		setTags(result);
	};

	let renderedCopies;
	if (tags) {
		renderedCopies = tags.map((tag) => {
			return <Tag key={tag.id} tag={tag.tag} />;
		});
	}

	return (
		<div className="card">
			<h1 className="text-lg font-bold">{tags ? `Tags: ${tags.length}` : "Tags: 0"}</h1>
			<div className="flex">{renderedCopies}</div>
		</div>
	);
};

export default BookTagsList;
