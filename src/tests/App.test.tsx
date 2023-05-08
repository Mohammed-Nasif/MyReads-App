// Testing Utilities
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Components
import App from './../App';

describe('Test that app routes work properly', () => {
	it('Check the Home Route', () => {
		render(
			<MemoryRouter initialEntries={['/']}>
				<App />
			</MemoryRouter>,
		);
		const searchBtn = screen.getByRole('link', { name: 'Go To Search' });
		expect(searchBtn).toBeInTheDocument();
	});

	it('Check the Search Route', () => {
		render(
			<MemoryRouter initialEntries={['/search']}>
				<App />
			</MemoryRouter>,
		);
		const backToHomeBtn = screen.getByRole('link', { name: 'Back To Home' });
		expect(backToHomeBtn).toBeInTheDocument();
	});
});
