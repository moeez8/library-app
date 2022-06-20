export default interface ICopyService {
	GetAllCopies: () => Promise<any>;
	GetCopyByID: (id: number) => Promise<any>;
	CreateNewCopy: () => Promise<any>;
	UpdateCopyByID: (id: number) => Promise<any>;
	DeleteCopyByID: (id: number) => Promise<any>;
	CheckOutCopyByID: (id: number) => Promise<any>;
	CheckInCopyByID: (id: number) => Promise<any>;
	CheckCopyStatusByID: (id: number) => Promise<any>;
}
