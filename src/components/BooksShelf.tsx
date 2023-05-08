// React utilities
import { FC } from 'react';

// Components
import { Book } from './Book';

// Types and Interfaces
import { Book as BookInterface, Shelf } from '../@types/interfaces';

// LottieFiles
import { Player } from '@lottiefiles/react-lottie-player';

export const BooksShelf: FC<{
	shelf: Shelf;
	shelvesBooks: BookInterface[];
}> = ({ shelf, shelvesBooks }): JSX.Element => {

	return (
		<div className='bookshelf'>
			<h2 className='bookshelf-title mt-3 pb-2'>{shelf.name}</h2>
			<div className='bookshelf-books'>
				<ol className='books-grid'>
					{/* Conditional Render For Search Shelf casue there is no book.shelf === Search so No Filter Applied */}
					{shelf.identifier === 'search' ? (
						shelvesBooks.length > 0 ? (
							shelvesBooks.map((book: BookInterface) => (
								<li key={book.id}>
									<Book book={book} />
								</li>
							))
						) : (
							<Player
								src='https://assets4.lottiefiles.com/packages/lf20_MrIjH2.json'
								className='player'
								loop
								autoplay
								style={{ height: '500px', width: '500px', paddingTop: '50px' }}
							/>
						)
					) : (
						shelvesBooks
							.filter((book: BookInterface) => book.shelf === shelf.identifier)
							.map((book: BookInterface) => (
								<li key={book.id}>
									<Book book={book} />
								</li>
							))
					)}
				</ol>
			</div>
		</div>
	);
};
