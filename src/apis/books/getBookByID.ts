// Constants
import { API } from './constants';
import { requestHeaders } from './auth';

// Types and Interfaces
import { Book } from '../../@types/interfaces';

export const getBookByID = (bookId: Book['id']): Promise<Book> =>
	fetch(`${API}/books/${bookId}`, { headers: requestHeaders })
		.then((res) => res.json())
		.then((data) => data.book);
