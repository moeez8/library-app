import { useState, useEffect } from "react";
import IBook from "../../interfaces/IBook";


const Modal = (props: any) => {

    const handleClose = () => {
        props.toggle();
    };

    const handleClick = () => {
        props.addToForm(book);
        props.toggle();
    };

    const truncate = (str: String) => {

    }

    const [book, setBook] = useState<IBook>();

    useEffect(() => {
        getBookData();
    }, []);

    const getBookData = async () => {

        //Getting book data from Open Library 'details' api 
        const bookDetails = await fetch(process.env.REACT_APP_BASE_URL + `/ol/${props.bookIBAN}`)
        const details = await bookDetails.json();

        if (bookDetails.status == 200 && Object.keys(details).length !== 0) {

            //If book data is retrieved then get the 'works' data from the Open Library 'works' api using the 'works id'
            const OLWorkSubDirectory: String = details[`ISBN:${props.bookIBAN}`].details.works[0].key
            const OLWorkID = OLWorkSubDirectory.replaceAll('/', '').replaceAll('works', '');

            const OLWork = await fetch(process.env.REACT_APP_BASE_URL + `/ol/works/${OLWorkID}`, {
            })
            const workData = await OLWork.json();
            //console.log(workData.description)

            setBook({
                title: details[`ISBN:${props.bookIBAN}`].details.title,
                description: workData.description.value || workData.description,
                author: details[`ISBN:${props.bookIBAN}`].details.authors[0].name,
            });
        }

    };

    if (book) {

        return (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                <div className="flex justify-around">
                    <div className="card mx-auto w-1/2">
                        <span className="float-right" onClick={handleClose}>&times;    </span>
                        <h1 className="text-2xl font-bold m-1">Is this the book you're looking for?</h1> <br />
                        <div className="flex">
                            <div className="flex-auto m-1 break-words">
                                <h1 className="text-xl font-bold" > {book.title || "Undefined"}</h1 >
                                <h1 className="text-lg">{book.author ? `Author: ${book.author}` : "Author: Undefined"}</h1><br />
                                <h1 className="text-lg">{book.description ? `Description: ${book.description.split(" ").splice(0, 50).join(" ")}` : "Description: No description found"}</h1> <br />
                                <h1 className="text-lg">{`ISBN: ${props.bookIBAN}`}</h1> <br />
                            </div >
                            <div className="flex-none self-center">
                                {/* No image will be displayed if API does not have image, could potentially have a placeholder */}
                                <img src={`https://covers.openlibrary.org/b/isbn/${props.bookIBAN}-M.jpg`} />
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