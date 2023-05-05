// React utilities
import { FC } from 'react';

// Components
import { BooksShelf } from './BooksShelf';

// Types And Interfaces
import { Book, Shelf } from '../@types/interfaces';

export const ShelvesWrapper: FC<{ shelves: Shelf[]; shelvesBooks: Book[] }> = ({ shelves, shelvesBooks }): JSX.Element => {
	
	return (
		<div className='list-books-content'>
			<div>
				{shelves.map((shelf: Shelf) => (
					<BooksShelf key={shelf.id} shelf={shelf} shelvesBooks={shelvesBooks} />
				))}
			</div>
		</div>
	);
};
