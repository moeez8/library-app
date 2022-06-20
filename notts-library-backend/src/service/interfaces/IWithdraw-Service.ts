export default interface IWithdrawService {
	GetAllWithdraws: () => Promise<any>;
	GetWithdrawByID: (id: number) => Promise<any>;
	CreateNewWithdraw: () => Promise<any>;
	UpdateWithdrawByID: (id: number) => Promise<any>;
	DeleteWithdrawByID: (id: number) => Promise<any>;
}
