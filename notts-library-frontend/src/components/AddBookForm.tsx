import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBookForm = () => {
  let navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [iban, setIban] = useState("");
  const [tags, setTags] = useState([{ tag_id: "1" }, { tag_id: "2" }]);

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
        setTags([...tags, { tag_id: event.currentTarget.value }]);
        event.currentTarget.value = "";
      }
    }
  };

  const removeTag = (removedTag: any) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("../", { replace: true });
  };

  const addBook = () => {
    console.log(tags)
    console.log(JSON.stringify(tags))
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
        tag_ids: [{ "tag_id": 1 }, { "tag_id": 2 }]
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

        <div className="tag-container">
          {tags.map((tag, index) => {
            return (
              <div key={index} className="tag">
                <span>
                  <span className="m-1 bg-gray-200 hover:bg-gray-300 rounded-full px-2 font-bold text-sm leading-loose cursor-pointer" > {tag.tag_id}{' '}
                    <span className=" w-5 h-5 border-red-100 bg-red-400 inline-flex items-center justify-center text-white rounded-full transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline" onClick={() => removeTag(tag)}> x  </span>
                  </span>


                </span>
              </div>
            );
          })}

          <input className="border border-2 rounded-md m-1" onKeyDown={addTag} placeholder="Add Tag" />
        </div>

        <button className="button" type="submit" onClick={addBook}>
          Add
        </button>
      </form>
    </div>
  );
};

export default AddBookForm;
