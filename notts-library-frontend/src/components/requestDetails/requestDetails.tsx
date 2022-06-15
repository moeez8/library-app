import React from "react";
import IRequest from "../../interfaces/IRequest";

const requestDetails = ({ request }: { request?: IRequest }) => {
	return (
		<div className="card">
			<h1 className="text-lg ">Request ID: {request?.id || "Undefined"}</h1>
			<h1 className="text-lg ">Requested By: {request?.requestedBy || "Undefined"}</h1>
			<h1 className="text-lg ">Request Date: {request?.request_date || "Undefined"}</h1>
			<h1 className="text-lg">Fulfill Date: {request?.fulfill_date || "Request Not Yet Fulfilled"}</h1>
		</div>
	);
};

export default requestDetails;
