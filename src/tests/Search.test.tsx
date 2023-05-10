// Testing Utilities
import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Types and Interface
import { Book as BookInterface, Shelf } from '../@types/interfaces';

// Components
import { Search } from '../pages/Search';
import { BooksShelf } from '../components/BooksShelf';
import { Home } from '../pages/Home';
import userEvent from '@testing-library/user-event';

describe('Test Search Page', () => {
	it('Check the existing of Back To Home Button', () => {
		render(
			<MemoryRouter>
				<Search />
			</MemoryRouter>,
		);
		const searchBtn = screen.getByRole('link', { name: 'Back To Home' });
		expect(searchBtn).toBeInTheDocument();
	});

	it('Test that the search button go to search page properly', async () => {
		render(
			<MemoryRouter>
				<Home />
				<Search />
			</MemoryRouter>,
		);
		const homeBtn = screen.getByRole('link', { name: 'Back To Home' });
		await act(async () => await userEvent.click(homeBtn));
		await act(async () => {
			expect(screen.getByRole('heading', { name: 'Currently Reading' })).toBeInTheDocument();
		});
	});

	it('Check the existing of Search Shelf', () => {
		const shelf: Shelf = { id: 0, name: 'Search', identifier: 'search' };
		const shelvesBooks: BookInterface[] = [];

		render(
			<MemoryRouter>
				<BooksShelf shelf={shelf} shelvesBooks={shelvesBooks} />
			</MemoryRouter>,
		);

		const searchShelf = screen.getByRole('heading', { name: 'Search' });
		expect(searchShelf).toBeInTheDocument();
	});

	it('Check the existing of Input Field in Search Bar', () => {
		render(
			<MemoryRouter>
				<Search />
			</MemoryRouter>,
		);

		const searchInputField = screen.getByPlaceholderText('Search by title or author');
		expect(searchInputField).toBeInTheDocument();
	});

	it('Test Change Value of the Input Field in Search Bar', () => {
		render(
			<MemoryRouter>
				<Search />
			</MemoryRouter>,
		);

		const searchInputField = screen.getByPlaceholderText('Search by title or author');

		fireEvent.change(searchInputField, { target: { value: 'React' } });

		expect((searchInputField as HTMLInputElement).value).toBe('React');
		expect((searchInputField as HTMLInputElement).value).not.toBe('Reacct');
	});
});
