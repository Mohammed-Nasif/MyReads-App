// Constants
import { API } from './constants';
import { requestHeaders } from './auth';

// Types and Interfaces
import { Book } from '../../@types/interfaces';

export const searchBooks = (query: string): Promise<Book[]> =>
	fetch(`${API}/search`, {
		method: 'POST',
		headers: {
			...requestHeaders,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ query }),
	})
		.then((res) => res.json())
		.then((data) => data.books);
