import { useState } from "react";
import IBook from "../../interfaces/IBook";
import ReadMoreReact from 'read-more-react';

export const BookDescription = ({ book }: { book: IBook }) => {


    return (

        //<h1 className="text-lg"> {book.description ? `Description: ${book.description.split(" ").splice(0, 50).join(" ")}` : "Description: No description found"} </h1>
        <div> <ReadMoreReact text={book.description} ideal={200} max={300} />
            <h1 className="text-lg">  </h1></div>


    );
};

export default BookDescription;
