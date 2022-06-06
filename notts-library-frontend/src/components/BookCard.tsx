interface BookInfo {
  title?: string;
  author?: string;
  description?: string;
}

const BookCard = ({
  title = "Undefined Title",
  author = "Undefined Author",
  description = "Undefined Desctiption",
}: BookInfo) => {
  return (
    <div className="bg-white rounded-md shadow-md p-4 m-2">
      <h1 className="text-lg font-bold">{title}</h1>
      <h1 className="text-lg font-bold">{author}</h1>
      <h1 className="text-lg font-bold">{description}</h1>
    </div>
  );
};

export default BookCard;
