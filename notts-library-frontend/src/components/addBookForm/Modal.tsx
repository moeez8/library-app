import { useState, useEffect } from "react";
import IBook from "../../interfaces/IBook";
import ReadMoreReact from 'read-more-react';

const Modal = (props: any) => {

    const handleClose = () => {
        props.toggle();
    };

    const handleClick = () => {
        props.addToForm(book);
        props.toggle();
    };

    const [book, setBook] = useState<IBook>();

    useEffect(() => {
        getBookData();
    }, []);

    const getBookData = async () => {
        //Getting book details from Open Library 'details' api and data from 'data' api
        //Both apis return very similar information but due to inconsistencies sometimes either api is missing information such as author etc..
        //Fetching from both gives us the highest chance of ensuring no null data is returned 
        if (props.bookISBN) {
            const bookDetails = await fetch(process.env.REACT_APP_BASE_URL + `/ol/details/${props.bookISBN}`)
            const details = await bookDetails.json();

            const bookData = await fetch(process.env.REACT_APP_BASE_URL + `/ol/data/${props.bookISBN}`)
            const data = await bookData.json();

            if (bookDetails.status == 200 && Object.keys(details).length !== 0 && bookData.status == 200 && Object.keys(data).length !== 0) {

                //If book details is retrieved then get the 'works' data from the Open Library 'works' api using the 'works id'
                const OLWorkSubDirectory: String = details[`ISBN:${props.bookISBN}`].details.works[0].key
                const OLWorkID = OLWorkSubDirectory.replaceAll('/', '').replaceAll('works', '');

                const OLWork = await fetch(process.env.REACT_APP_BASE_URL + `/ol/works/${OLWorkID}`)
                const workData = await OLWork.json();

                setBook({
                    title: details[`ISBN:${props.bookISBN}`].details.title,
                    description: workData.description ? workData.description.value || workData.description : "",
                    author: details[`ISBN:${props.bookISBN}`].details.authors ? details[`ISBN:${props.bookISBN}`].details.authors[0].name :
                        data[`ISBN:${props.bookISBN}`].authors[0].name
                });
            }
        }
    };

    if (book) {
        return (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                <div className="flex justify-around">
                    <div className="card mx-auto w-1/2">
                        <h1 className="text-2xl font-bold m-1">Is this the book you're looking for?</h1> <br />
                        <div className="flex">
                            <div className="flex-auto m-1 break-words">
                                <h1 className="text-xl font-bold" > {book.title || "Undefined"}</h1 >
                                <h1 className="text-lg">{book.author ? `Author: ${book.author}` : "Author: Undefined"}</h1><br />

                                <h1 className="text-lg"> {book.description ?
                                    <ReadMoreReact text={book.description} ideal={200} max={300} /> : "Description: Undefined"} </h1> <br />

                                <h1 className="text-lg">{`ISBN: ${props.bookISBN}`}</h1> <br />
                            </div >
                            <div className="flex-none self-center">
                                {/* No image will be displayed if API does not have image, could potentially have a placeholder */}
                                <img src={`https://covers.openlibrary.org/b/ISBN/${props.bookISBN}-M.jpg`} />
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
        return null
    }
}

export default Modal