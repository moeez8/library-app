import IBook from "./IBook";

export default interface IRequest {
    id?: string;
    book_id?: string;
    request_date?: string;
    fulfill_date?: string;
    requestedBy?: string;
    book?: IBook
}
