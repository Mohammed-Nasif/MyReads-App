// React Utilities
import { FC, FormEvent } from 'react';

// React Router
import { Link } from 'react-router-dom';

export const SearchBar: FC<{ searchQueryHandler: (e: FormEvent<HTMLInputElement>) => void }> = ({ searchQueryHandler }): JSX.Element => {
	
	return (
		<div className='search-books-bar'>
			<Link to='/' className='close-search'>
				Back To Home
			</Link>
			<div className='search-books-input-wrapper'>
				<input type='text' placeholder='Search by title or author' onChange={searchQueryHandler} />
			</div>
		</div>
	);
};
