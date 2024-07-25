import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';
import { baseUserSettings } from '../constants';
import { useNavigate } from 'react-router-dom';

interface iInitialUserSettings {
    name: null | string;
    logIn: null | string;
}

const initialUserSettings: iInitialUserSettings = {
    name: null,
    logIn: null,
};

function Form() {
    const [userSettings, setUserSettings] = useState(initialUserSettings);
    const [isNoCorrectValue, setIsNoCorrectValue] = useState(false);
    const navigate = useNavigate();

    function handleChangeName(event: React.ChangeEvent<HTMLInputElement>) {
        setUserSettings({ ...userSettings, name: event.currentTarget.value.toString().trim() });
    }

    function handleChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
        setUserSettings({ ...userSettings, logIn: event.currentTarget.value.toString().trim() });
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const { name, logIn } = userSettings;
        const { baseName, baseLogIn } = baseUserSettings;
        const isAuthCorrect = name === baseName && logIn === baseLogIn;

        if (isAuthCorrect) {
            localStorage.setItem('name', JSON.stringify(name));
            localStorage.setItem('logIn', JSON.stringify(logIn));
            navigate('/bitcoin-price');
            setIsNoCorrectValue(false);
        } else {
            setIsNoCorrectValue(true);
        }
    }

    return (
        <Dialog
            open={true}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit,
            }}
        >
            <DialogTitle>Авторизация</DialogTitle>

            <DialogContent>
                <TextField
                    error={isNoCorrectValue}
                    variant='standard'
                    fullWidth
                    id='name'
                    required
                    autoFocus
                    type='text'
                    label='Имя'
                    onChange={handleChangeName}
                />
                <TextField
                    error={isNoCorrectValue}
                    variant='standard'
                    fullWidth
                    id='logIn'
                    required
                    type='text'
                    label='Логин'
                    onChange={handleChangePassword}
                />
            </DialogContent>

            <DialogActions
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Button variant='outlined' type='submit'>
                    Войти
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default Form;
