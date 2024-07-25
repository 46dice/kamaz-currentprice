import { Alert, CircularProgress, Container, Grid, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { fetchBitcoinData } from '../store/fetch.ts';
import { RootState } from '../store/store.ts';
import { useAppDispatch, useAppSelector } from '../store/hooks.ts';
import { format } from 'date-fns';
import { BpiInfo } from '../store/models.ts';
import CurrencyCard from './Currency-card.tsx';

function CurrencyValueList() {
    const dispatch = useAppDispatch();
    const bitcoinData = useAppSelector((state: RootState) => state.currencies);

    const formattedTime = bitcoinData.time?.updatedISO
        ? format(new Date(bitcoinData.time?.updatedISO), 'dd.MM.yyyy HH:mm')
        : 'Loading...';

    useEffect(() => {
        const timeToNewFetch = 20000;
        dispatch(fetchBitcoinData());

        const intervalId = setInterval(() => {
            dispatch(fetchBitcoinData());
        }, timeToNewFetch);

        return () => clearInterval(intervalId);
    }, [dispatch]);

    if (bitcoinData.loading) {
        return (
            <Stack height='100vh' alignItems='center' justifyContent='center'>
                <CircularProgress />
            </Stack>
        );
    }

    if (bitcoinData.error) {
        return <Alert severity='error'>{bitcoinData.error}</Alert>;
    }

    return (
        <Container>
            <Typography variant='h4' gutterBottom>
                Стоимость биткоина
            </Typography>
            <Typography variant='subtitle1' color='textSecondary' gutterBottom>
                Обновлено: {formattedTime} (Каждые 20сек.)
            </Typography>

            <Grid container spacing={3}>
                {Object.keys(bitcoinData.bpi).map((currencyKey) => {
                    const currency = bitcoinData.bpi[currencyKey as keyof BpiInfo];
                    const updatedPrice = currency.rate.replace(/,/g, ' ');

                    return (
                        <Grid item xs={12} sm={6} md={4} key={currency.code}>
                            <CurrencyCard
                                code={currency.code}
                                description={currency.description}
                                price={updatedPrice}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
}

export default CurrencyValueList;
