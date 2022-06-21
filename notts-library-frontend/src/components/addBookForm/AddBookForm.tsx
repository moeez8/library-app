import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IBook from "../../interfaces/IBook";
import Modal from "./Modal";
import FormBookTag from "./FormBookTag";

const AddBookForm = () => {
	const navigate = useNavigate();
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [description, setDescription] = useState("");
	const [iban, setIban] = useState("");
	const [tags, setTags] = useState<{ tag_name: string }[]>([]);

	const [option, setOption] = useState<String>();

	const [modal, setModal] = useState(false)

	const toggleModal = (event: React.ChangeEvent<HTMLInputElement>) => {
		setModal(!modal);
	};

	const hideModal = (event: React.FocusEvent<HTMLInputElement>) => {
		if (modal) {
			setModal(!modal);
		}
	};

	const populateForm = (book: IBook) => {
		setTitle(book.title || "")
		setAuthor(book.author || "")
		setDescription(book.description || "")
		setIban(iban)

	}


	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
	};

	const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAuthor(event.target.value);
	};

	const handleDescChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setDescription(event.target.value);
	};

	const handleIbanChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setIban(event.target.value);
	};

	const addTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			if (event.currentTarget.value.length > 0) {
				event.preventDefault();
				setTags([...tags, { tag_name: event.currentTarget.value }]);
				event.currentTarget.value = "";
			}
		}
	};

	const removeTag = (removedTag: any) => {
		const newTags = tags.filter((tag) => tag.tag_name !== removedTag);
		setTags(newTags);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setOption(e.target.value);
	};

	const handleEnter = (e: any) => {
		if (e.key === "Enter" && e.target.form) {
			const form: any = e.target.form;
			const index = [...form].indexOf(e.target);
			if (e.target.type == "textarea" && e.shiftKey) {
				return;
			} else {
				form.elements[index + 1].focus();
				e.preventDefault();
			}
		}
	};

	const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await addBook();
		if (option === "addBook") {
			navigate("../", { replace: true });
		} else {
			navigate("../Requests", { replace: true });
		}
	};

	const addBook = async () => {
		if (option === "addBook") {
			await fetch(process.env.REACT_APP_BASE_URL + "/book", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					title: title,
					description: description,
					author: author,
					iban: iban,
					tags: tags,
				}),
			});
		} else {
			await fetch(process.env.REACT_APP_BASE_URL + "/request", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					title: title,
					description: description,
					author: author,
					iban: iban,
					tags: tags,
				}),
			});
		}
	};

	return (
		<div className="card">
			<h1 className="text-xl font-bold m-1">Add Book</h1>
			<form onSubmit={handleOnSubmit}>
				<input className="form-input" name="isbn" placeholder="Please enter 10 or 13 digit ISBN" value={iban} onChange={handleIbanChange} onKeyDown={handleEnter} onBlur={toggleModal} onFocus={hideModal} required />
				<input className="form-input" name="title" placeholder="Book Title" value={title} onChange={handleTitleChange} onKeyDown={handleEnter} required />
				<input className="form-input" name="author" placeholder="Book Author" value={author} onChange={handleAuthorChange} onKeyDown={handleEnter} required />
				<textarea className="form-input" name="content" placeholder="Book Description" onChange={handleDescChange} value={description} onKeyDown={handleEnter} required />
				<div className="card">
					<h1 className="text-lg font-bold">Tags</h1>

					<div>
						<input className="form-input" onKeyDown={addTag} placeholder="Press enter to submit" />
					</div>

					<div className="flex flex-wrap">
						{tags.map((tag, index) => {
							return <FormBookTag tag={tag.tag_name} key={index} removeTagFunc={removeTag} />;
						})}
					</div>
				</div>
				<div className="card ">
					<h1 className="text-lg font-bold"> Add or Request?</h1>
					<div className="flex gap-2">
						<label className="flex">
							<div className="flex flex-col justify-around">
								<input className="w-4 h-4 m-1" required name="bookOption" type="radio" value="addBook" onChange={handleChange} />
							</div>
							<h1 className="flex flex-col justify-around">Add Book</h1>
						</label>

						<label className="flex">
							<div className="flex flex-col justify-around">
								<input className="w-4 h-4 m-1" required name="bookOption" type="radio" value="requestBook" onChange={handleChange} />
							</div>
							<h1 className="flex flex-col justify-around">Request</h1>
						</label>
					</div>
				</div>

				<button className="button-green" type="submit">
					Submit
				</button>
			</form>


			{modal ? <Modal className="z-10 float-right" toggle={toggleModal} bookIBAN={iban} addToForm={populateForm} /> : null}

		</div>
	);
};

export default AddBookForm;
