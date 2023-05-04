import React, { useState } from 'react'
import './App.css';
import logo from './logo.svg';
import Icon from '../images/icon';
import AlumNet2 from '../images/AlumNet2_1.png';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Login = () => {

    const [loginData, setLoginData] = useState({
        id: '',
        password: ''
    })

    const { id, password } = loginData;

    const theme = createTheme();

    const onChange = (e) => {
        setLoginData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        })
        )
    }

    const [open, setOpen] = useState(false);
    const [text, setText] = useState('')

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const onSubmit = async (e) => {

        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/login", loginData)

            alert(response.data.token)

            setLoginData({
                id: '',
                password: ''
            })
        }
        catch (err) {
            setText(err.response.data.message)
        }

        setOpen(true)
    }

    return (
        <>

            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={open}
                        onClose={handleClose}
                        autoHideDuration={5000}>
                        <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
                            {text}
                        </Alert>

                    </Snackbar>
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 6,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }
                        }
                    >
                        <Paper sx={{ p: 4, width: 500 }} elevation={5} square>
                            <Box sx={{ marginTop: 0, marginBottom: 1, alignItems: 'center' }}>
                                <img src={AlumNet2} alt="logo" className="Applogo" width='50%' height='50%' style={{ display: 'block', margin: 'auto' }} />
                                {/* <Icon alt="logo" className="Applogo"height='10vmin' style={{ display: 'block', margin: 'auto' }}/> */}
                            </Box>

                            <Typography component="h1" variant="h5" textAlign='center'>
                                Sign in
                            </Typography>
                            <Box component="form" onSubmit={onSubmit} sx={{ mt: 0 }}>
                                <TextField required margin="normal" value={id} onChange={onChange} type='Number' fullWidth id="id" label="ID" name="id" autoComplete="id" />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    value={password}
                                    onChange={onChange}
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item xs>

                                    </Grid>
                                    <Grid item >
                                        <Link href="/register" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                    </Box>

                </Container>
            </ThemeProvider>

        </>
    );
}

export default Login