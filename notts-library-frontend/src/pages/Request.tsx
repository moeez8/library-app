import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Header from "../components/Header";
import IRequest from "../interfaces/IRequest";
import RequestDetails from "../components/requestDetails/requestDetails";
import BookDetails from "../components/bookDetails/BookDetails";
import RequestAdminControls from "../components/requestDetails/RequestAdminControls";
import RecordDeleted from "../components/RecordDeleted";

const Request = () => {
	const params = useParams();
	const [request, setRequest] = useState<IRequest>();

	useEffect(() => {
		getRequest();
	}, []);

	const getRequest = async () => {
		const result = await fetch(`http://localhost:5000/request/${params.id}`);
		if (result.status === 200) setRequest(await result.json());
	};

	return (
		<>
			<Header />
			{request ? (
				<>
					{request.deletedAt ? <RecordDeleted /> : null}
					<RequestDetails request={request} />
					<BookDetails book={request.book} />
					{request.deletedAt ? null : <RequestAdminControls request={request} />}
				</>
			) : (
				<div className="card bg-red-200 border-2 border-red-400 ">
					<h1 className="text-lg font-bold text-red-600">No Request Found</h1>
				</div>
			)}
		</>
	);
};

export default Request;
