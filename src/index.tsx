import ReactDOM from 'react-dom/client';

// Main App Component
import App from './App';

// React Router
import { BrowserRouter } from 'react-router-dom';

// Contexts Providers
import UserBooksProvider from './contexts/UserBooksContext';

// React StrictMode
import { StrictMode } from 'react';

// CSS Styles
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<StrictMode>
		<BrowserRouter>
			<UserBooksProvider>
				<App />
			</UserBooksProvider>
		</BrowserRouter>
	</StrictMode>,
);
