import { Link } from "react-router-dom";
import BookDetails from "../bookDetails/BookDetails";

import IRequest from "../../interfaces/IRequest";

export const RequestListCard = ({ request }: { request: IRequest }) => {
	return (
		<div className="card">
			<div className="m-1 break-words">
				{request.book ? (
					<>
						<h1 className="text-2xl font-bold ">{request.book.title || "Undefined"}</h1>
						<h1 className="text-lg">{request.book.iban ? `IBAN: ${request.book.iban}` : "IBAN: Undefined"}</h1>
					</>
				) : (
					<div className="card bg-red-200 border-2 border-red-400 ">
						<h1 className="text-lg font-bold text-red-600">No Book Found</h1>
					</div>
				)}

				<h1 className="text-lg">Requested By: {request.requestedBy || "Undefined"}</h1>
				<h1 className="text-lg ">Request Date: {request?.request_date ? new Date(request?.request_date).toUTCString() : "Undefined"}</h1>
				<h1 className="text-lg">Fulfilled On: {request.fulfill_date || "Request Not Yet Fulfilled"}</h1>
			</div>
			<div className="flex">
				<Link className="button" to={`/request/${request.id}`}>
					<h2>Details</h2>
				</Link>
			</div>
		</div>
	);
};

export default RequestListCard;
