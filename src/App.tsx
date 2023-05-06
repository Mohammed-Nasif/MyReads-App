// Pages
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { Auth } from './pages/Auth';

// Hooks
import { useEffect, useState } from 'react';

// React Router
import { Route, Routes } from 'react-router-dom';

// CSS Styles
import './styles/App.css';

function App(): JSX.Element {

	const [userToken, setUserToken] = useState<string>(localStorage.token);
	const token = localStorage.token;
	
	useEffect(() => {
		setUserToken(localStorage.token);
	}, [token]);

	return (
		<>
			<Routes>
				<Route path='/' element={userToken === '' ? <Auth /> : <Home />} />
				{userToken !== '' && <Route path='/search' element={<Search />} />}
				{userToken === '' && <Route path='*' element={<Auth />} />}
			</Routes>
		</>
	);
}

export default App;
