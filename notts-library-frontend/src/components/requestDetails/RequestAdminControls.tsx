import IRequest from "../../interfaces/IRequest";
import { useNavigate } from "react-router-dom";

const RequestAdminControls = ({ request }: { request: IRequest }) => {
	const navigate = useNavigate();

	const closeRequest = async () => {
		if (window.confirm("Are you sure?")) {
			const res = await fetch(`http://localhost:5000/request/${request.id}`, {
				method: "DELETE",
			});
			if (res.status == 200) {
				alert("Request Closed");
				navigate("../Requests", { replace: true });
			} else {
				alert("Failed To Close Request");
			}
		}
	};

	const fulFillRequest = async () => {
		if (window.confirm("Are you sure? This will create a new copy of this book")) {
			const res = await fetch(`http://localhost:5000/request/${request.id}/fulfill`, {
				method: "PUT",
			});
			if (res.status == 200) {
				alert("Request Fulfilled");
				navigate("../", { replace: true });
			} else {
				alert("Failed To Fulfill Request");
			}
		}
	};

	return (
		<div className="card">
			<button onClick={closeRequest} className="button-red">
				<h1>Close Request</h1>
			</button>

			<button onClick={fulFillRequest} className="button-green">
				<h1>Fulfill Request</h1>
			</button>
		</div>
	);
};

export default RequestAdminControls;
