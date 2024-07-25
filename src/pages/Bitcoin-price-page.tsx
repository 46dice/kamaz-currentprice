import { useNavigate } from 'react-router-dom';
import CurrencyValueList from '../components/Currency-value-list';
import { useEffect } from 'react';

function BitcoinPrice() {
    const name = localStorage.getItem('name');
    const logIn = localStorage.getItem('logIn');
    const isAuth = name && logIn;

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate(import.meta.env.BASE_URL);
        }
    }, [isAuth, navigate]);

    if (!isAuth) {
        return null;
    }

    return <CurrencyValueList />;
}

export default BitcoinPrice;
