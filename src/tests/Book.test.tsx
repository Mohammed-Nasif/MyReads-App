// Testing Utilities
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Types and Interface
import { Book as BookInterface } from '../@types/interfaces';

// Components
import { Book } from '../components/Book';

describe('Test Book Component', () => {
	it('Check that Books render properly according to Props', () => {
		const shelfBook: BookInterface = {
			title: 'The Android Invasion',
			authors: ['Christopher Black'],
			publisher: 'Yearling',
			publishedDate: '1984-06-01',
			description:
				'In this multiple plot adventure, readers and their robot companion must stop armies of attacking androids before they conquer the galaxy.',
			industryIdentifiers: [
				{
					type: 'ISBN_10',
					identifier: '0440400813',
				},
			],
			readingModes: {
				text: false,
				image: false,
			},
			pageCount: 117,
			printType: 'BOOK',
			categories: ['Androids'],
			maturityRating: 'NOT_MATURE',
			allowAnonLogging: false,
			contentVersion: '0.0.1.0.preview.0',
			imageLinks: {
				smallThumbnail: 'http://books.google.com/books/content?id=tsRhkvo80iUC&printsec=frontcover&img=1&zoom=5&source=gbs_api',
				thumbnail: 'http://books.google.com/books/content?id=tsRhkvo80iUC&printsec=frontcover&img=1&zoom=1&source=gbs_api',
			},
			language: 'en',
			previewLink: 'http://books.google.com/books?id=tsRhkvo80iUC&q=android&dq=android&hl=&cd=2&source=gbs_api',
			infoLink: 'http://books.google.com/books?id=tsRhkvo80iUC&dq=android&hl=&source=gbs_api',
			canonicalVolumeLink: 'https://books.google.com/books/about/The_Android_Invasion.html?hl=&id=tsRhkvo80iUC',
			id: 'tsRhkvo80iUC',
			shelf: 'read',
			subtitle: '',
			averageRating: 0,
			ratingsCount: 0,
			panelizationSummary: {
				containsEpubBubbles: false,
				containsImageBubbles: false,
			},
		};

		render(
			<MemoryRouter>
				<Book book={shelfBook} />
			</MemoryRouter>,
		);

		// Test The Category [Shelf] of The Book in Select Menu
		const selectElement = screen.getByRole('combobox');
		// eslint-disable-next-line testing-library/await-async-utils
		waitFor(() => expect(selectElement).toHaveDisplayValue('Read'));
		// eslint-disable-next-line testing-library/await-async-utils
		waitFor(() => expect(selectElement).not.toHaveDisplayValue('none'));

		// Test The Book Data Rendered
		const bookShelf = screen.getByText('read');
		expect(bookShelf).toBeInTheDocument();

		const bookTitle = screen.getByText('The Android Invasion');
		expect(bookTitle).toBeInTheDocument();

		const bookAuthor = screen.getByText('Christopher Black');
		expect(bookAuthor).toBeInTheDocument();
	});
});
