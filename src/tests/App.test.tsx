// Testing Utilities
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

// Components
import { Home } from '../pages/Home';
import { Search } from '../pages/Search';
import { PageNotFound } from '../pages/PageNotFound';

describe('Test that app routes work properly', () => {
	it('Check the Home Route', () => {
		render(
			<MemoryRouter initialEntries={['/home']}>
				<Routes>
					<Route path='/home' element={<Home />} />
					<Route path='/search' element={<Search />} />
					<Route path='*' element={<PageNotFound />} />
				</Routes>
			</MemoryRouter>,
		);
		const searchBtn = screen.getByRole('link', { name: 'Go To Search' });
		expect(searchBtn).toBeInTheDocument();
	});

	it('Check the Search Route', () => {
		render(
			<MemoryRouter initialEntries={['/search']}>
				<Routes>
					<Route path='/home' element={<Home />} />
					<Route path='/search' element={<Search />} />
					<Route path='*' element={<PageNotFound />} />
				</Routes>
			</MemoryRouter>,
		);
		const backToHomeBtn = screen.getByRole('link', { name: 'Back To Home' });
		expect(backToHomeBtn).toBeInTheDocument();
	});

	it('Check the Notfound Route', () => {
		render(
			<MemoryRouter initialEntries={['/404']}>
				<Routes>
					<Route path='/home' element={<Home />} />
					<Route path='/search' element={<Search />} />
					<Route path='*' element={<PageNotFound />} />
				</Routes>
			</MemoryRouter>,
		);
		// eslint-disable-next-line testing-library/no-node-access
		const notFoundImage = document.querySelector('img') as HTMLImageElement;
		expect(notFoundImage.alt).toContain('404');
	});
});
