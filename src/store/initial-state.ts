import { BitcoinData } from './models';

export const initialState: BitcoinData = {
    time: {
        updatedISO: '',
    },
    disclaimer: '',
    bpi: {
        USD: {
            code: 'USD',
            rate: '0',
            description: '',
        },
        GBP: {
            code: 'GBP',
            rate: '0',
            description: '',
        },
        EUR: {
            code: 'EUR',
            rate: '0',
            description: '',
        },
    },
    error: '',
    loading: false,
};
