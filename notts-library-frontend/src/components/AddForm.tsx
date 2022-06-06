import React, { useEffect, useState } from "react";

function AddForm() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    }

    function handleDescChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setDescription(event.target.value);
    }

    const formInfo = {
        title: "bookTitle",
        description: "bookDescription"
    }

    function addBook(bookTitle: string, bookDescription: string) {
        console.log(formInfo)
        fetch("http://localhost:5000/book", {
            method: "POST",
            headers: {
                'Content-type': "application/x-www-form-urlencoded"
            },
            body: JSON.stringify(formInfo)
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }

    return (
        <div className="bg-white rounded-md shadow-md p-4 m-2">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    name="title"
                    placeholder="Book Title"
                    value={title}
                    onChange={handleTitleChange}
                />
                <textarea className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    name="content"
                    placeholder="Book description"
                    //rows="3"
                    onChange={handleDescChange}
                    value={description}
                />

                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
                    onClick={() => addBook(title, description)}>

                    Add
                </button>
            </form>
        </div>
    );
}

export default AddForm;