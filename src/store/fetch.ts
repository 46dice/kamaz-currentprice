import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BitcoinData } from './models';
import { URL } from '../constants';

const FETCH_BITCOIN_DATA = 'currencies/fetchBitcoinData';

export const fetchBitcoinData = createAsyncThunk<BitcoinData, undefined, { rejectValue: string }>(
    FETCH_BITCOIN_DATA,
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<BitcoinData>(URL.BASE);

            if (response.status !== 200) {
                return rejectWithValue(`Server error: ${response.status}`);
            }

            return response.data;
        } catch (error) {
            let errorMessage = 'Failed to fetch data';

            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            return rejectWithValue(errorMessage);
        }
    },
);
