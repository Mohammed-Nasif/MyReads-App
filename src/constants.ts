export const API: string = 'https://reactnd-books-api.udacity.com';

// Generate a unique token for storing your bookshelf data on the backend server.
let token: string = localStorage.token;
if (!token) token = localStorage.token = Math.random().toString(36).substring(-8);

export let requestHeaders: HeadersInit = new Headers();
requestHeaders = {
	Accept: 'application/json',
	Authorization: token,
};
