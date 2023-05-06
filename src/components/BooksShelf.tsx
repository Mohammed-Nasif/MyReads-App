// React utilities
import { FC } from 'react';

// Components
import { Book } from './Book';

// Types and Interfaces
import { Book as BookInterface, Shelf } from '../@types/interfaces';

export const BooksShelf: FC<{
	shelf: Shelf;
	shelvesBooks: BookInterface[];
}> = ({ shelf, shelvesBooks }): JSX.Element => {
	
	return (
		<div className='bookshelf'>
			<h2 className='bookshelf-title mt-3 pb-2'>{shelf.name}</h2>
			<div className='bookshelf-books'>
				<ol className='books-grid'>
					{shelf.identifier === 'search'
						? shelvesBooks.map((book: BookInterface) => (
								<li key={book.id}>
									<Book book={book} />
								</li>
						  ))
						: shelvesBooks
								.filter((book: BookInterface) => book.shelf === shelf.identifier)
								.map((book: BookInterface) => (
									<li key={book.id}>
										<Book book={book} />
									</li>
								))}
				</ol>
			</div>
		</div>
	);
};
