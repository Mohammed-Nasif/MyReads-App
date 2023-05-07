// Pages
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { Auth } from './pages/Auth';
import { PageNotFound } from './pages/PageNotFound';

// Hooks
import { useEffect, useState } from 'react';

// React Router
import { Route, Routes} from 'react-router-dom';

// CSS Styles
import './styles/App.css';

function App(): JSX.Element {

	const [userToken, setUserToken] = useState<string>(localStorage.token);
	const token = localStorage.token;

	useEffect(() => {
		// Check on User Token onAppMount
		setUserToken(localStorage.token);
	}, [token]);

	return (
		<>
			<Routes>
				{/* - App Routes according to Authentication - */}
				{userToken === '' ? (
					<>
						<Route path='/' element={<Auth />} />
						<Route path='*' element={<Auth />} />
					</>
				) : (
					<>
						<Route path='/' element={<Home />} />
						<Route path='/home' element={<Home />} />
						<Route path='/search' element={<Search />} />
						<Route path='*' element={<PageNotFound />} />
					</>
				)}
			</Routes>
		</>
	);
}

export default App;
