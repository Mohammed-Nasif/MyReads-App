// React Router 
import { useNavigate } from 'react-router-dom';

export const HomeHeader = (): JSX.Element => {

	const navigate = useNavigate();

	const onLogout = () => {
		// Clear User Token From LocalStorage
		localStorage.token = '';

		// We Here Should be Connecting With Backend and DB [It's Just Mocking]
		const userCollection = JSON.parse(localStorage.users);
		// Get the current Logged user using the ID we Saved onLogin
		const loggedUser = userCollection[localStorage.userID];
		// Cut The User To update his state
		userCollection.splice(localStorage.userID, 1);

		loggedUser['isLogged'] = false; // Change Logged Status
		localStorage.userID = ''; // Remove ID from LocalStorage

		// Put The User To The Collection
		userCollection.push(loggedUser);

		// Set The Collection Again To LocalStorage
		localStorage.setItem('users', JSON.stringify(userCollection));

		// Navigate to Login Page Again
		navigate('/'); 
		navigate(0); // Reload To Re-render after Token Lost in LocalStorage
	};

	return (
		<div className='list-books-title'>
			<h1>MyReads App</h1>
			<button className='btn btn-outline-light btn-sm my-3' onClick={onLogout}>
				Logout
			</button>
		</div>
	);
};
