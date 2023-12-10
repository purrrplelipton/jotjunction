import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import { AccountOverview, Home, NewNote, NoteView, Register, SignIn } from './pages';
import { store } from './store';

const root = createRoot(document.getElementById('root'));
const router = createBrowserRouter([
	{ path: '/register', element: <Register /> },
	{ path: '/sign-in', element: <SignIn /> },
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/:id',
		element: <NoteView />,
	},
	{
		path: '/new-note',
		element: <NewNote />,
	},
	{
		path: '/account-overview',
		element: <AccountOverview />,
	},
]);

root.render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>,
);
