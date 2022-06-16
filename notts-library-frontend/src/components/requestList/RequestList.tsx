import RequestListCard from "./RequestListCard";
import IRequest from "../../interfaces/IRequest";
import { useState, useEffect } from "react";

const RequestList = () => {
	const [requests, setRequests] = useState<IRequest[]>([]);
	useEffect(() => {
		getRequests();
	}, []);

	const getRequests = async () => {
		const res = await fetch(`http://localhost:5000/request`);
		const data = await res.json();
		setRequests(data);
	};

	const renderedItems = requests.map((request) => {
		return <RequestListCard key={request.id} request={request} />;
	});

	return (
		<div className="card">
			<h1 className="text-xl font-bold m-1">{`Total Requests: ${renderedItems.length}`}</h1>
			{renderedItems}
		</div>
	);
};

export default RequestList;
