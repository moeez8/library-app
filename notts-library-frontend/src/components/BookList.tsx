import BookCard from "./BookCard";
import { useState, useEffect } from "react";

const BookList = () => {
  const [books, setbooks] = useState([]);
  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    const result = await fetch(`http://localhost:5000/book`).then((response) =>
      response.json()
    );
    console.log(result);
    setbooks(result);
  };

  const renderedItems = [];

  for (const book in books) {
    renderedItems.push(<BookCard />);
  }

  return (
    <div className="bg-white rounded-md shadow-md p-4 m-2">{renderedItems}</div>
  );
};

export default BookList;
