export default interface IBookService {
	GetAllBooks: () => Promise<any>;
	SearchBooks: (query: string) => Promise<any>;
	GetBookByID: (id: number) => Promise<any>;
	CreateNewBook: () => Promise<any>;
	UpdateBookByID: (id: number) => Promise<any>;
	DeleteBookByID: (id: number) => Promise<any>;
}
