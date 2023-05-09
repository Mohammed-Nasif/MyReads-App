// Types and Interfaces
import { Book } from './interfaces';

export type UserBooksContextType = {
	shelvesUserBooks: Book[];
	setUpdateFlag: (updateFlag: boolean) => void;
	updateFlag: boolean;
};
