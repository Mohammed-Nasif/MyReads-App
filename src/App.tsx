// Pages
import { Home } from './pages/Home';
import { Search } from './pages/Search';

// React Router
import { Route, Routes } from 'react-router-dom';

// CSS Styles
import './styles/App.css';

function App(): JSX.Element {
	return (
		<>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/home' element={<Home />} />
				<Route path='/search' element={<Search />} />
			</Routes>
		</>
	);
}

export default App;
