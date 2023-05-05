// Hooks and Utilities
import { createContext, FC, ReactNode, useEffect, useState } from 'react';

// API Functions
import { getAllBooks } from '../apis/books/getAllBooks';

// Types and Interfaces
import { UserBooksContextType } from '../@types/types';
import { Book } from '../@types/interfaces';

export const UserBooksContext = createContext<UserBooksContextType | null>(null);

const UserBooksProvider: FC<{ children: ReactNode }> = ({ children }) => {
	
	const [shelvesUserBooks, setSelvesUserBooks] = useState<Book[]>([]);
	const [updateFlag, setUpdateFlag] = useState<boolean>(false);

	useEffect(() => {
		// Fetch All User Books From The API On Page Mounted
		const fetchUserBooksList = async (): Promise<void> => {
			try {
				const userBooksListResponse = await getAllBooks();
				setSelvesUserBooks(userBooksListResponse);
			} catch (error) {
				throw new Error();
			}
		};
		return () => {
			fetchUserBooksList();
		};
	}, [updateFlag]);

	return <UserBooksContext.Provider value={{ shelvesUserBooks, setUpdateFlag }}>{children}</UserBooksContext.Provider>;
};

export default UserBooksProvider;
