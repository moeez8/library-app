import { useState, useEffect } from "react";
import IBook from "../interfaces/IBook";


const Modal = (props: any) => {

    const handleClose = () => {
        props.toggle();
    };

    const handleClick = () => {
        props.addToForm(book);
        props.toggle();
    };

    const [book, setbook] = useState<IBook>();

    useEffect(() => {
        getBook();
    }, []);

    const getBook = async () => {
        const res = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${props.bookIBAN}&jscmd=details&format=json`);
        if (res.status == (200)) {
            const data = await res.json();
            setbook({
                title: data[`ISBN:${props.bookIBAN}`].details.title,
                description: data[`ISBN:${props.bookIBAN}`].details.description,
                author: data[`ISBN:${props.bookIBAN}`].details.authors[0].name,
                imgURL: data[`ISBN:${props.bookIBAN}`].thumbnail_url
            });
        }
    };

    if (book) {

        return (

            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                <div className="flex justify-around">
                    <div className="card mx-auto ">



                        <span className="float-right" onClick={handleClose}>&times;    </span>
                        <h1 className="text-2xl font-bold m-1">Is this the book you're looking for?</h1>



                        <div className="flex">
                            <div className="m-1 break-words">
                                <h1 className="text-xl font-bold" > {book.title || "Undefined"}</h1 >
                                <h1 className="text-lg">{book.author ? `Author: ${book.author}` : "Author: Undefined"}</h1>
                                <h1 className="text-lg">{book.description ? `Description: ${book.description}` : "Description: No description found"}</h1>
                                <h1 className="text-lg">{`IBAN: ${props.bookIBAN}`}</h1>
                            </div >
                            <div className="">
                                <img src={book.imgURL} />
                            </div>
                        </div>

                        <button className="button-green" type="button" onClick={handleClick}>
                            Yes
                        </button>

                        <button className="button-red" type="button" onClick={handleClose}>
                            No - Enter Details Manually
                        </button>


                    </div>
                </div>
            </div>

        )

    }

    else {

        return (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                <div className="flex justify-around">
                    <div className="card mx-auto ">
                        <span className="float-right" onClick={handleClose}>&times;    </span>
                        <h1 className="text-2xl font-bold" > Book could not be found, please enter manually</h1 >
                        <button className="button-green" type="button" onClick={handleClose}>
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        )

    }
}

export default Modal