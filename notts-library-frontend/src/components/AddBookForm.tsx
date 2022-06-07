import React, { useEffect, useState } from "react";

const AddBookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [iban, setIban] = useState("");

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

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const addBook = () => {
    fetch("http://localhost:5000/book", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        author: author,
        iban: iban,
      }),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="card">
      <h1 className="text-xl font-bold m-1">Add Book</h1>
      <form onSubmit={handleOnSubmit}>
        <input
          className="form-input"
          name="title"
          placeholder="Book Title"
          value={title}
          onChange={handleTitleChange}
          required
        />
        <input
          className="form-input"
          name="author"
          placeholder="Book Author"
          value={author}
          onChange={handleAuthorChange}
          required
        />
        <textarea
          className="form-input"
          name="content"
          placeholder="Book Description"
          //rows="3"
          onChange={handleDescChange}
          value={description}
          required
        />
        <input
          className="form-input"
          name="iban"
          placeholder="Book IBAN"
          value={iban}
          onChange={handleIbanChange}
          required
        />
        <button className="button" type="button" onClick={addBook}>
          Add
        </button>
      </form>
    </div>
  );
};

export default AddBookForm;
