export interface IBook {
  title?: string;
  author?: string;
  description?: string;
}

export const BookCard = (book: IBook) => {
  return (
    <div className="bg-white rounded-md shadow-md p-4 m-2">
      <h1 className="text-lg font-bold">{book.title || "Undefined"}</h1>
      <h1 className="text-lg font-bold">{book.author || "Undefined"}</h1>
      <h1 className="text-lg font-bold">{book.description || "Undefined"}</h1>
    </div>
  );
};

export default BookCard;
