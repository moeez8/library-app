export default interface IPurchaseRequestService {
	GetAllPurchaseRequests: () => Promise<any>;
	SearchPurchaseRequests: (query: string) => Promise<any>;
	GetPurchaseRequestByID: (id: number) => Promise<any>;
	CreateNewPurchaseRequest: () => Promise<any>;
	UpdatePurchaseRequestByID: (id: number) => Promise<any>;
	DeletePurchaseRequestByID: (id: number) => Promise<any>;
}
