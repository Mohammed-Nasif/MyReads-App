// Forms Components
import { Signup } from '../components/AuthForms/Signup';
import { Login } from '../components/AuthForms/Login';

// Hooks
import { useEffect } from 'react';

// React Router
import { useNavigate, Routes, Route } from 'react-router-dom';

export const Auth = () => {
	
	const navigate = useNavigate();

	useEffect(() => {
		// Always Navigate To Login Page if the user try to access any different Route except Signup Route
		if (window.location.pathname !== '/signup') navigate('/');
	}, [navigate]);

	return (
		<>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/signup' element={<Signup />} />
			</Routes>
		</>
	);
};
