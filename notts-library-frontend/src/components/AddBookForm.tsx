import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

const AddBookForm = () => {
  let navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("../", { replace: true })
  };

  const addBook = (bookTitle: string, bookDescription: string) => {
    fetch("http://localhost:5000/book", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ title: bookTitle, description: bookDescription }),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      })
  };

  return (
    <div className="bg-white rounded-md shadow-md p-4 m-2">
      <h1 className="text-xl font-bold m-1">Add Book</h1>
      <form onSubmit={handleOnSubmit}>
        <input
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 m-1"
          name="title"
          placeholder="Book Title"
          value={title}
          onChange={handleTitleChange}
          required
        />
        <textarea
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 m-1"
          name="content"
          placeholder="Book description"
          //rows="3"
          onChange={handleDescChange}
          value={description}
          required
        />

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-2"
          onClick={() => addBook(title, description)}
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddBookForm;
