// Hooks and Utilities
import { createContext, FC, ReactNode, useEffect, useState } from 'react';

// API Functions
import { getAllBooks } from '../apis/books/getAllBooks';

// Types and Interfaces
import { UserBooksContextType } from '../@types/types';
import { Book } from '../@types/interfaces';

export const UserBooksContext = createContext<UserBooksContextType | null>({ shelvesUserBooks: [], setUpdateFlag: false });

const UserBooksProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [shelvesUserBooks, setSelvesUserBooks] = useState<Book[]>([]);

	// Flag To Trigger The Update Done To Refetch The Data in Home Page
	const [updateFlag, setUpdateFlag] = useState<boolean>(false);

	// SideEffect On The Update Flag To fetch Book Data
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

		// Cleanup onUnmount
		return () => {
			fetchUserBooksList();
		};
	}, [updateFlag]);

	return <UserBooksContext.Provider value={{ shelvesUserBooks, setUpdateFlag }}>{children}</UserBooksContext.Provider>;
};

export default UserBooksProvider;
