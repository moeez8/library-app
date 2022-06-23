import ICopy from "./ICopy";
import ITag from "./ITag";

export default interface IBook {
	id?: string;
	title?: string;
	author?: string;
	description?: string;
	ISBN?: string;
	deletedAt?: string;
	imgURL?: string
	// copies?: ICopy[];
	// type?: string;
	// category?: string;
	// cover_photo?: any;
	// tags?: ITag[];
}
