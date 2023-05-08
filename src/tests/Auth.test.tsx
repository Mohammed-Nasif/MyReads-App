// Testing Utilities
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

// Components
import { Login } from '../components/AuthForms/Login';
import { Signup } from '../components/AuthForms/Signup';

// ==== Login Tests ====
describe('Test Login Page', () => {
	it('Check the login button in login form', () => {
		render(
			<MemoryRouter initialEntries={['/']}>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/signup' element={<Signup />} />
				</Routes>
			</MemoryRouter>,
		);
		const loginBtn = screen.getByRole('button', { name: 'Login' });
		expect(loginBtn).toBeInTheDocument();
	});

	it('Check the signup link in login page', () => {
		render(
			<MemoryRouter initialEntries={['/']}>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/signup' element={<Signup />} />
				</Routes>
			</MemoryRouter>,
		);
		const signupLink = screen.getByRole('link', { name: 'Signup' });
		expect(signupLink).toBeInTheDocument();
	});

	it('Check the redirect of user to signup page', async () => {
		render(
			<MemoryRouter initialEntries={['/']}>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/signup' element={<Signup />} />
				</Routes>
			</MemoryRouter>,
		);
		const signupLink = screen.getByRole('link', { name: 'Signup' });
		await act(async () => await userEvent.click(signupLink));
		await act(async () => {
			expect(await screen.findByText('Join Us!')).toBeInTheDocument();
		});
	});
});

// ==== Sign up Tests ====

describe('Test Sign up Page', () => {
	it('Check The Login link in Signup Page', () => {
		render(
			<MemoryRouter initialEntries={['/signup']}>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/signup' element={<Signup />} />
				</Routes>
			</MemoryRouter>,
		);
		const loginLink = screen.getByRole('link', { name: 'Login' });
		expect(loginLink).toBeInTheDocument();
	});

	it('Check The Signup Button in Signup Form', () => {
		render(
			<MemoryRouter initialEntries={['/signup']}>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/signup' element={<Signup />} />
				</Routes>
			</MemoryRouter>,
		);
		const signupBtn = screen.getByRole('button', { name: 'Sign up' });
		expect(signupBtn).toBeInTheDocument();
	});

	it('Check the redirect of user to login page', async () => {
		render(
			<MemoryRouter initialEntries={['/signup']}>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/signup' element={<Signup />} />
				</Routes>
			</MemoryRouter>,
		);
		const loginLink = screen.getByRole('link', { name: 'Login' });
		await act(async () => await userEvent.click(loginLink));
		await act(async () => {
			expect(await screen.findByText('Welcome Back!')).toBeInTheDocument();
		});
	});
});
