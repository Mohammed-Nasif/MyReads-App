// Types and Interfaces
import { User } from '../../@types/interfaces';

// Set The Generated unique token for storing User bookshelf data in The LocalStorage on Login and Signup.
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
