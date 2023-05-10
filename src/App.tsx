// Pages
import { Auth } from './pages/Auth';
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { BookDetails } from './pages/BookDetails';
import { PageNotFound } from './pages/PageNotFound';

// React-Toastify
import { ToastContainer } from 'react-toastify';

// React Router
import { Route, Routes } from 'react-router-dom';

// CSS Styles
import './styles/App.css';
import 'react-toastify/dist/ReactToastify.css';

function App(): JSX.Element {
	return (
		<>
			<ToastContainer />
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
						<Route path='/book/:bookID' element={<BookDetails />} />
						<Route path='*' element={<PageNotFound />} />
					</>
				)}
			</Routes>
		</>
	);
}

export default App;
