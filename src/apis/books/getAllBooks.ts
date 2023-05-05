// Constants
import { API, requestHeaders } from '../../constants';

// Types and Interfaces
import { Book } from '../../@types/interfaces';

export const getAllBooks = (): Promise<Book[]> =>
	fetch(`${API}/books`, { headers: requestHeaders })
		.then((res) => res.json())
		.then((data) => data.books);
