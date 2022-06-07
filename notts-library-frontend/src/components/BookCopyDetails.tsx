import { ICopy } from "./BookCard";

const BookCopyDetails = (copy: ICopy) => {
	return (
		<div className="card">
			<h1>{`Copy ID: ${copy.id}`}</h1>
			<h1>{`Owner: ${copy.owner}`}</h1>
		</div>
	);
};

export default BookCopyDetails;
