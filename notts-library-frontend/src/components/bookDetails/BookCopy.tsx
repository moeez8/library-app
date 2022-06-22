import { useState, useEffect } from "react";
import { createReturn } from "typescript";
import ICopy from "../../interfaces/ICopy";

const BookCopy = ({ copy }: { copy: ICopy }) => {
	const [status, setstatus] = useState<boolean>();
	useEffect(() => {
		getBook();
	}, []);

	const [user, setUser] = useState<boolean>();
	useEffect(() => {
		getBook();
	}, []);

	const getBook = async () => {
		const res = await fetch(process.env.REACT_APP_BASE_URL + `/copy/${copy.id}/status`);
		const data = await res.json();
		setstatus(data.status);
		setUser(data.user_name);
	};

	const checkOutBook = async () => {
		let name = await window.prompt("Please Enter Your Name.");

		if (name === null || name === "") {
			await alert("No name entered");
			return;
		}

		const result = await fetch(process.env.REACT_APP_BASE_URL + `/copy/${copy.id}/check-out`, {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				name: name,
			}),
		});

		if (result.status === 200) {
			alert("Book Checked Out!");
		} else {
			alert("Book Could Not Be Checked Out!");
		}
		getBook();
	};

	const checkInBook = async () => {
		const res = await fetch(process.env.REACT_APP_BASE_URL + `/copy/${copy.id}/check-in`, { method: "PUT" });

		if (window.confirm("Are you sure you want to check in this book?")) {
			if (res.status == 200) {
				alert("Book Checked In!");
			} else {
				alert("Book Could Not Be Checked In!");
			}
			getBook();
		}
	};

	return (
		<div className="card flex justify-between">
			<div className="flex flex-col justify-around">
				<h1 className="text-lg">{`Owner: ${copy.owner}`}</h1>
				<h1 className="text-lg">{status ? "Status: Avaliable" : "Status: Not Avaliable"}</h1>
				<h1 className="text-lg">{status ? "Current Holder: None" : `Current Holder: ${user}`}</h1>
			</div>
			<div className="flex flex-col justify-around">
				{status ? (
					<button onClick={checkOutBook} className="button-green">
						<h1>Check Out</h1>
					</button>
				) : (
					<button onClick={checkInBook} className="button-red">
						<h1>Check In</h1>
					</button>
				)}
			</div>
		</div>
	);
};

export default BookCopy;
