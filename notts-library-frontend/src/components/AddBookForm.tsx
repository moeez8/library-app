import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBookForm = () => {
  let navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [iban, setIban] = useState("");
  const [tags, setTags] = useState<{ tag_name: string }[]>([]);

  const [option, setOption] = useState<String>()

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
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOption(e.target.value);

  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("../", { replace: true });
  };

  const addBook = () => {

    console.log(option)

    if (option === "addBook") {

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
          tags: tags
        }),

      })
        .then((res) => res.json())
        .catch((err) => {
          console.log(err);
        });

    } else {

      fetch("http://localhost:5000/request", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
          author: author,
          iban: iban,
          tags: tags
        }),

      })
        .then((res) => res.json())
        .catch((err) => {
          console.log(err);
        });

    }

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
        <div className="card">
          <h1 className="text-lg font-bold">Tags</h1>

          <div>
            <input className="form-input" onKeyDown={addTag} placeholder="Press enter to submit" />
          </div>

          <div className="flex flex-wrap">
            {tags.map((tag, index) => {
              return (
                <span key={index} className="tag"> {tag.tag_name}{' '}
                  <span className=" w-5 h-5 border-red-100 bg-red-400 inline-flex items-center justify-center text-white rounded-full transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
                    onClick={() => removeTag(tag)}> x  </span>
                </span>
              );
            })}
          </div>


        </div>
        <div className="card ">
          <h1 className="text-lg font-bold"> Add or request a book?</h1>
          <div className="flex gap-2">
            <label>
              <input className="m-1" required name="bookOption" type="radio" value="addBook" onChange={handleChange} />
              Add Book
            </label>

            <label>
              <input className="m-1" required name="bookOption" type="radio" value="requestBook" onChange={handleChange} />
              Request Book
            </label>
          </div>
        </div>

        <button className="button-green" type="submit" onClick={addBook}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBookForm;
