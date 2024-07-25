import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../store/initial-state.ts';
import { fetchBitcoinData } from '../store/fetch.ts';

const currenciesSlice = createSlice({
    name: 'currencies',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchBitcoinData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBitcoinData.fulfilled, (state, action) => {
                return { ...state, ...action.payload, loading: false, error: null };
            })
            .addCase(fetchBitcoinData.rejected, (state) => {
                state.loading = false;
                state.error = 'Failed to fetch data';
            });
    },
});

export default currenciesSlice.reducer;
