import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import BitcoinValue from './pages/Bitcoin-price-page.tsx';
import AuthPage from './pages/Auth-page.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path={import.meta.env.BASE_URL} element={<App />}>
            <Route index element={<AuthPage />} />
            <Route path='bitcoin-price' element={<BitcoinValue />} />
        </Route>,
    ),
);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>,
);
