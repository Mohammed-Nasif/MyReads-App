// Testing Utilities
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

// Types and Interface
import { Book as BookInterface, Shelf } from '../@types/interfaces';

// Components
import { Home } from '../pages/Home';
import { ShelvesWrapper } from '../components/ShelvesWrapper';
import { Search } from '../pages/Search';

describe('Test Home Page', () => {
	it('Check the existing of Logout Button', () => {
		render(
			<MemoryRouter>
				<Home />
			</MemoryRouter>,
		);
		const logoutBtn = screen.getByRole('button', { name: 'Logout' });
		expect(logoutBtn).toBeInTheDocument();
	});

	it('Check the existing of Search Button', () => {
		render(
			<MemoryRouter>
				<Home />
			</MemoryRouter>,
		);
		const searchBtn = screen.getByRole('link', { name: 'Go To Search' });
		expect(searchBtn).toBeInTheDocument();
	});

	it('Test that the search button go to search page properly', async () => {
		render(
			<MemoryRouter>
				<Home />
				<Search />
			</MemoryRouter>,
		);
		const searchBtn = screen.getByRole('link', { name: 'Go To Search' });
		await act(async () => await userEvent.click(searchBtn));
		await act(async () => {
			expect(screen.getByRole('heading', { name: 'Search' })).toBeInTheDocument();
		});
	});

	it('Check the existing of Shelves', () => {
		const homeShelves: Shelf[] = [
			{ id: 0, name: 'Currently Reading', identifier: 'currentlyReading' },
			{ id: 1, name: 'Want to Read', identifier: 'wantToRead' },
			{ id: 2, name: 'Read', identifier: 'read' },
		];
		const shelvesBooks: BookInterface[] = [];

		render(
			<MemoryRouter>
				<ShelvesWrapper shelves={homeShelves} shelvesBooks={shelvesBooks} />
			</MemoryRouter>,
		);

		const currentlyReadingShelf = screen.getByRole('heading', { name: 'Currently Reading' });
		expect(currentlyReadingShelf).toBeInTheDocument();

		const wantToReadShelf = screen.getByRole('heading', { name: 'Want to Read' });
		expect(wantToReadShelf).toBeInTheDocument();

		const readShelf = screen.getByRole('heading', { name: 'Read' });
		expect(readShelf).toBeInTheDocument();
	});
});
