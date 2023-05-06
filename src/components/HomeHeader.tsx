// React Router 
import { useNavigate } from 'react-router-dom';

export const HomeHeader = (): JSX.Element => {

	const navigate = useNavigate();

	const logout = () => {
		localStorage.token = '';
		let currentUsers = JSON.parse(localStorage.users);
		const loggedUser = currentUsers[localStorage.userID];
		currentUsers.splice(localStorage.userID, 1);
		loggedUser['isLogged'] = false;
		localStorage.userID = '';
		currentUsers.push(loggedUser);
		localStorage.setItem('users', JSON.stringify(currentUsers));
		navigate('/');
		navigate(0);
	};

	return (
		<div className='list-books-title'>
			<h1>MyReads App</h1>
			<button className='btn btn-outline-light btn-sm my-3' onClick={logout}>
				Logout
			</button>
		</div>
	);
};
