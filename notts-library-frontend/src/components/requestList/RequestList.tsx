import RequestListCard from "./RequestListCard";
import IRequest from "../../interfaces/IRequest";
import IBook from "../../interfaces/IBook";
import { useState, useEffect } from "react";

const RequestList = () => {
	const [requests, setRequests] = useState<IRequest[]>([]);
	useEffect(() => {
		getRequests();
	}, []);

	const getRequests = async () => {
		const result = await fetch(`http://localhost:5000/request`).then((response) => response.json());
		setRequests(result);
	};

	const renderedItems = requests.map((request) => {
		return <RequestListCard key={request.id} request={request} />;
	});

	return (
		<div className="card">
			<h1 className="text-xl font-bold m-1">{`Total Books: ${renderedItems.length}`}</h1>
			{renderedItems}
		</div>
	);
};

export default RequestList;
