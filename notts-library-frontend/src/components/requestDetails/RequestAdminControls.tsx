import IRequest from "../../interfaces/IRequest";
import { useNavigate } from "react-router-dom";

const RequestAdminControls = ({ request }: { request: IRequest }) => {
	const navigate = useNavigate();

	const closeRequest = async () => {
		if (window.confirm("Are you sure?")) {
			const res = await fetch(`http://localhost:5000/request/${request.id}`, {
				method: "POST",
			});
			if (res.status == 200) {
				alert("Request Closed");
				navigate("../", { replace: true });
			} else {
				alert("Failed To Close Request");
			}
		}
	};

	return (
		<div className="card">
			<button onClick={closeRequest} className="button-red">
				<h1>Close Request</h1>
			</button>
		</div>
	);
};

export default RequestAdminControls;
