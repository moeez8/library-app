import ITag from "./ITag";

export default interface IBook {
	id?: string;
	title?: string;
	author?: string;
	description?: string;
	ISBN?: string;
	tags?: ITag[];
	user: string
}
