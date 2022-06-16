import { useState, useEffect } from "react";
import ICopy from "../../interfaces/ICopy";

const BookCopy = ({ copy }: { copy: ICopy }) => {
	const [status, setstatus] = useState<boolean>();
	useEffect(() => {
		getBook();
	}, []);

	const getBook = async () => {
		const result = await fetch(`http://localhost:5000/copy/${copy.id}/status`).then((response) => response.json());
		setstatus(result.status);
	};

	const checkOutBook = async () => {
		const name = await window.prompt("Please Enter Your Name.");

		if (name === null) return;

		const result = await fetch(`http://localhost:5000/copy/${copy.id}/check-out`, {
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
		await fetch(`http://localhost:5000/copy/${copy.id}/check-in`, { method: "PUT" })
			.then((res) => {
				if (res.status === 200) {
					alert("Book Checked In!");
				} else {
					alert("Book Could Not Be Checked In!");
				}
				getBook();
			})
			.catch((err) => {
				getBook();
			});
	};

	return (
		<div className="card flex justify-between">
			<div className="flex flex-col justify-around">
				{/* <h1>{`Copy ID: ${copy.id}`}</h1> */}
				<h1 className="text-lg">{`Owner: ${copy.owner}`}</h1>
				<h1 className="text-lg">{status ? "Status: Avaliable" : "Status: Not Avaliable"}</h1>
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
