import { BitcoinData } from './models';

export const initialState: BitcoinData = {
    time: {
        updated: '',
        updatedISO: '',
        updateduk: '',
    },
    disclaimer: '',
    chartName: 'Bitcoin',
    bpi: {
        USD: {
            code: 'USD',
            rate: '0',
            description: '',
            rate_float: 0,
        },
        GBP: {
            code: 'GBP',
            rate: '0',
            description: '',
            rate_float: 0,
        },
        EUR: {
            code: 'EUR',
            rate: '0',
            description: '',
            rate_float: 0,
        },
    },
    error: '',
    loading: false,
};
