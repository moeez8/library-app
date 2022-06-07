import ICopy from "../../interfaces/ICopy";

const BookCopy = (copy: ICopy) => {
	return (
		<div className="card">
			<h1>{`Copy ID: ${copy.id}`}</h1>
			<h1>{`Owner: ${copy.owner}`}</h1>
		</div>
	);
};

export default BookCopy;
