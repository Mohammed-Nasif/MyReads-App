// Types and Interfaces
import { User } from '../../@types/interfaces';

// Generate a unique token for storing your bookshelf data on the backend server.
export const AuthUserToken = (loggedUser: User) => {
	if (loggedUser.isLogged) {
		localStorage.token = loggedUser.userToken;
	}
};

export let requestHeaders: HeadersInit = new Headers();
requestHeaders = {
	Accept: 'application/json',
	Authorization: localStorage.token,
};
