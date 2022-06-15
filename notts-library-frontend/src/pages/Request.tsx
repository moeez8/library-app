import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Header from "../components/Header";
import IRequest from "../interfaces/IRequest";

const Request = () => {
	const [request, setRequest] = useState<IRequest>();

	return (
		<>
			<Header />
			{request ? (
				<></>
			) : (
				<div className="card bg-red-200 border-2 border-red-400 ">
					<h1 className="text-lg font-bold text-red-600">No Request Found</h1>
				</div>
			)}
		</>
	);
};

export default Request;
