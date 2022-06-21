import IBook from "../../interfaces/IBook";

export default interface IBookService {
	getAllBooks: () => Promise<any>;
	searchBooks: (query: string) => Promise<any>;
	getBookByID: (id: number) => Promise<any>;
	createNewBook: (book: IBook) => Promise<any>;
	updateBookByID: (id: number, title: string, iban: string, author: string, type: string, category: string, cover_photo: string, description: string, tags: any) => Promise<any>;
	deleteBookByID: (id: number) => Promise<any>;
	getCopiesByBookID: (id: number) => Promise<any>;
	getTagsByBookID: (id: number) => Promise<any>;
}
