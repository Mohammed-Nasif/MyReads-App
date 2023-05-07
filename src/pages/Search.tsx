// Hooks
import { FormEvent, useContext, useDeferredValue, useEffect, useState } from 'react';

// API Functions
import { searchBooks } from '../apis/books/searchBooks';

// Components
import { BooksShelf } from '../components/BooksShelf';
import { SearchBar } from '../components/SearchBar';

// Contexts
import { UserBooksContext } from '../contexts/UserBooksContext';

// Types and Interfaces
import { UserBooksContextType } from '../@types/types';
import { Shelf, Book } from '../@types/interfaces';

export const Search = (): JSX.Element => {

	const shelf: Shelf = { id: 0, name: 'Search', identifier: 'search' };

	const [searchQuery, setSearchQuery] = useState<string>('');

	// Deferred Value For Search Query To Debounce user typing
	const deferredSearchQuery = useDeferredValue<string>(searchQuery);
	const [searchedBooks, setSearchedBooks] = useState<Book[]>([]);

	// Use User Current Books from the userBookscontext
	const { shelvesUserBooks } = useContext(UserBooksContext) as UserBooksContextType;

	useEffect(() => {
		// Flag To Ignore Pervious Request If SearchQuery Changed 
		let ignorePrevReq: boolean = false;

		(async () => {
			setSearchedBooks([]);
			if (deferredSearchQuery.trim() !== '') {
				const searchedBooksResult = await searchBooks(deferredSearchQuery.trim());
				searchedBooksResult.forEach((book: any) => (book.shelf = 'none'));
				if (!ignorePrevReq) categorizeSearchedBooks(searchedBooksResult);
			}
		})();

		return () => {
			ignorePrevReq = true;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [deferredSearchQuery]);

	// Fn Sent to SearchBar To Get The SearchQuery Value as we Can't setState it From Child To Parent
	const searchQueryHandler = (e: FormEvent<HTMLInputElement>): void => {
		setSearchQuery(e.currentTarget.value);
	};

	// Fn To set Shelf [Category] To Each Book from Search EndPoint 
	const categorizeSearchedBooks = (searchedBooksResult: Book[]): void => {
		searchedBooksResult.forEach((book: Book) => {
			shelvesUserBooks.forEach((userBook: Book) => {
				if (book.id === userBook.id) book.shelf = userBook.shelf;
			});
		});
		setSearchedBooks(searchedBooksResult);
	};

	return (
		<div className='search-books'>
			<SearchBar searchQueryHandler={searchQueryHandler} />
			<BooksShelf shelf={shelf} shelvesBooks={searchedBooks} />
		</div>
	);
};
