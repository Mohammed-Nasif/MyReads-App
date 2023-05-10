// React Hooks and Utilities
import { useEffect, useState } from 'react';

// React Router
import { useParams } from 'react-router-dom';

// API Functions
import { getBookByID } from '../apis/books/getBookByID';

// Types and Interfaces
import { Book } from '../@types/interfaces';

export const BookDetails = (): JSX.Element => {
	
	const [currentBook, setCurrentBook] = useState<Book>();

	// Pick The BookID From The URL
	const { bookID } = useParams<string>();

	// PlaceHolder For Books with no Thumbnail
	const bookPlaceholder: string = 'https://placehold.co/128x193?text=No+Cover+Available';

	useEffect(() => {
		(async () => {
			if (bookID) {
				const requiredBook = await getBookByID(bookID);
				setCurrentBook(requiredBook);
			}
		})();
	}, [bookID]);

	if (!currentBook) {
		return <h2 className='pt-5 text-warning w-100 text-center'>Loading Book Details ...</h2>;
	}

	return (
		<div className='w-75 mt-3 m-auto'>
			<h2 className='text-center text-white fs-1 fw-bold text-bg-secondary border rounded-4 py-2'>{currentBook?.title}</h2>
			<div>
				<div className='d-flex justify-content-between align-items-start mt-4'>
					<div>
						<div
							style={{
								minWidth: 240,
								height: 320,
							}}>
							<img className='w-75' src={currentBook?.imageLinks?.thumbnail || bookPlaceholder} alt='Book-Img' />
						</div>
						<p className='mt-2'>
							<span className='fw-bolder'>Category:</span> <span className='text-warning'>{currentBook?.categories}</span>
						</p>
						<p className='mt-3'>
							<span className='fw-bolder'>Publisher:</span> <span className='text-warning'>{currentBook?.publisher}</span>
						</p>
						<p className='mt-3'>
							<span className='fw-bolder'>Published at:</span> <span className='badge bg-secondary text-white'>{currentBook?.publishedDate}</span>
						</p>
						<p>
							<span className='fw-bolder'>Authors:</span>
							<ul>
								{currentBook?.authors.map((author, i) => (
									<li key={i} className='text-white'>
										{author}
									</li>
								))}
							</ul>
						</p>
					</div>
					<div>
						<h4>Description: </h4>
						<p className='text-white'>{currentBook?.description}</p>
						<p className='badge bg-black'>Rate: {currentBook?.averageRating || 'No Rating'} ⭐️</p>
					</div>
				</div>
			</div>
		</div>
	);
};
