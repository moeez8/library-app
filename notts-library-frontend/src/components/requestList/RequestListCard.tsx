import { Link } from "react-router-dom";
import BookDetails from "../bookDetails/BookDetails"

import IRequest from "../../interfaces/IRequest";

export const RequestListCard = ({ request }: { request: IRequest }) => {
	return (
		<div className="card">
			<div className="m-1">
				{request.book ? (
					<>
						<BookDetails book={request.book} />
					</>
				) : (
					<div className="card bg-red-200 border-2 border-red-400 ">
						<h1 className="text-lg font-bold text-red-600">No Book Found</h1>
					</div>
				)}

				<h1 className="text-lg">Request ID: {request.id || "Undefined"}</h1>
				<h1 className="text-lg">Requested By: {request.requestedBy || "Undefined"}</h1>
				<h1 className="text-lg">Requested On: {request.request_date || "Undefined"}</h1>
				<h1 className="text-lg">Fulfilled On: {request.fulfill_date || "Request Not Yet Fulfilled"}</h1>

			</div>
			<div className="flex">
				<Link className="button" to={`/book/${request.book_id}`}>
					<h2>Details</h2>
				</Link>
			</div>
		</div>
	);
};

export default RequestListCard;
