// Hooks and Utilities
import { FC, FormEvent, useContext } from 'react';

// API Functions
import { updateBookShelf } from '../apis/books/updateBookShelf';

// Contexts
import { UserBooksContext } from '../contexts/UserBooksContext';

// Types and Interfaces
import { UserBooksContextType } from '../@types/types';
import { Book as BookInterface } from '../@types/interfaces';

export const Book: FC<{
	book: BookInterface;
}> = ({ book }): JSX.Element => {
	
	const { setUpdateFlag } = useContext(UserBooksContext) as UserBooksContextType;

	const bookPlaceholder: string = 'https://placehold.co/128x193?text=No+Cover+Available';

	const updateBookShelfHandler = async (e: FormEvent<HTMLSelectElement>): Promise<void> => {
		const selectedValue: string = e.currentTarget.value;
		await updateBookShelf(book, selectedValue);
		setUpdateFlag((prev: boolean) => !prev);
	};

	return (
		<div className='book'>
			<div className='book-top'>
				<div
					className='book-cover'
					style={{
						width: 128,
						height: 193,
						backgroundImage: `url(${book?.imageLinks?.thumbnail || bookPlaceholder})`,
					}}
				/>
				<div className='book-shelf-changer'>
					<select value={book.shelf} onChange={updateBookShelfHandler}>
						<option value='move' disabled>
							Move to...
						</option>
						<option value='currentlyReading'>Currently Reading</option>
						<option value='wantToRead'>Want to Read</option>
						<option value='read'>Read</option>
						<option value='none'>None</option>
					</select>
				</div>
			</div>
			<div className='book-title'>{book.title.slice(0, 25)}</div>
			<div className='book-authors'>
				{book.authors !== undefined
					? book.authors.map((author: string) =>
							book.authors[book.authors.length - 1] === author ? <span key={author}>{author}</span> : <span key={author}>{author}, </span>,
					  )
					: 'No Authors Avaliable'}
			</div>
			<div className='book-authors'>
				<p style={{ margin: '0px', opacity: '0.7' }}>{book.shelf}</p>
			</div>
		</div>
	);
};
