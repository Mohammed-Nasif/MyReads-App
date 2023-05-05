import { Link } from 'react-router-dom';

export const SearchButton = () => {
	return (
		<div className='open-search'>
			<button className='open-search'>
				<Link className='open-search' to='/search'>
					Go To Search
				</Link>
			</button>
		</div>
	);
};
