import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';

interface CurrencyCard {
    code: string;
    description: string;
    price: string;
}

function CurrencyCard({ code, description, price }: CurrencyCard) {
    return (
        <Card>
            <CardContent>
                <Typography variant='h6' gutterBottom>
                    {code}
                </Typography>
                <Typography variant='body1' color='textSecondary'>
                    {description}
                </Typography>
                <Typography variant='h5'>{price}</Typography>
            </CardContent>
        </Card>
    );
}

export default React.memo(CurrencyCard);
