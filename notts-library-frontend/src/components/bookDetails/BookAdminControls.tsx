import IBook from "../../interfaces/IBook";
import { useNavigate } from "react-router-dom";

const BookAdminControls = ({ book }: { book: IBook }) => {
	const navigate = useNavigate();

	const deleteBook = async () => {
		if (window.confirm("Are you sure?")) {
			const res = await fetch(process.env.REACT_APP_BASE_URL + "/book/${book.id}", {
				method: "DELETE",
			});
			if (res.status == 200) {
				alert("Book Deleted");
				navigate("../", { replace: true });
			} else {
				alert("Failed To Delete Book");
			}
		}
	};

	return (
		<div className="card">
			<button onClick={deleteBook} className="button-red">
				<h1>Archive Book</h1>
			</button>
		</div>
	);
};

export default BookAdminControls;
