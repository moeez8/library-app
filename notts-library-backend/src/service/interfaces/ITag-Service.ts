export default interface ITagService {
	GetAllTags: () => Promise<any>;
	GetTagByID: (id: number) => Promise<any>;
	CreateNewTag: () => Promise<any>;
	UpdateTagByID: (id: number) => Promise<any>;
	DeleteTagByID: (id: number) => Promise<any>;
}
