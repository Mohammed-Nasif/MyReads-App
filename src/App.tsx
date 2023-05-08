// Pages
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { Auth } from './pages/Auth';
import { PageNotFound } from './pages/PageNotFound';

// React Router
import { Route, Routes } from 'react-router-dom';

// CSS Styles
import './styles/App.css';

function App(): JSX.Element {
	return (
		<>
			<Routes>
				{/* - App Routes according to Authentication - */}
				{localStorage.token === '' || !localStorage.token ? (
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
