// Constants
import { API } from './constants';
import { requestHeaders } from './auth';

// Types and Interfaces
import { Book, Shelf } from '../../@types/interfaces';

export const updateBookShelf = (book: Book, shelfName: Shelf['name']): Promise<void> =>
	fetch(`${API}/books/${book.id}`, {
		method: 'PUT',
		headers: {
			...requestHeaders,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ shelf: shelfName }),
	}).then((res) => res.json());
