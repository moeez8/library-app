import { BookCard, IBook } from "./BookCard";
import { useState, useEffect } from "react";

const BookList = () => {
  const [books, setbooks] = useState<IBook[]>([]);
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

  const renderedItems = books.map((book) => {
    return (
      <BookCard
        title={book.title}
        author={book.author}
        description={book.description}
      />
    );
  });

  return (
    <div className="bg-white rounded-md shadow-md p-4 m-2">
      <h1 className="text-xl font-bold m-1">{`TotalBooks: ${renderedItems.length}`}</h1>
      {renderedItems}
    </div>
  );
};

export default BookList;
