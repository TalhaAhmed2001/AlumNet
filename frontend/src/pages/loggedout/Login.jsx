import React, { useState } from 'react'
import AlumNet2 from '../../images/AlumNet2_1.png';
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
import { useNavigate } from 'react-router-dom';
import home from '../../images/AlumNet_home_1.png'

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
        
        setOpen(false)

        if (id.trim() === ''){
            setText("'ID' field cannot be empty")
            setOpen(true)
            return
        }
        else if(isNaN(id)){
            setText("'ID' must be a number")
            setOpen(true)
            return
        }
        else if (password.trim() === ''){
            setText("'Password' field cannot be empty")
            setOpen(true)
            return
        }

        try {
            const response = await axios.post("http://localhost:5000/login", loginData)

            //alert(" " + response.data.erp + response.data.user_id + response.data.name)

            let token = response.data.token
            let user_id = response.data.user_id

            localStorage.setItem('jwt', token);
            localStorage.setItem('user_role', user_id)

            //navigate('/');
            window.location.assign('/')
        }
        catch (err) {
            setText(err.response.data.message)
            setOpen(true)
        }
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
                    {/* <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: {home},
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    /> */}
                    <br />
                    <Box
                        sx={{
                            marginTop: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }
                        }
                    >
                        <Paper sx={{ p: 4, width: 500 }} elevation={5} square>
                            <Box sx={{ marginTop: 0, marginBottom: 1, alignItems: 'center' }}>
                                <img src={AlumNet2} alt="logo" className="Applogo" width='50%' height='50%' style={{ display: 'block', margin: 'auto' }} />
                            </Box>

                            <Typography component="h1" variant="h5" textAlign='center'>
                                Sign in
                            </Typography>
                            <Box component="form" onSubmit={onSubmit} sx={{ mt: 2 }}>
                                <TextField
                                    margin="normal"
                                    value={id}
                                    onChange={onChange}
                                    type='text'
                                    fullWidth
                                    id="id"
                                    label="ID"
                                    name="id"
                                    minlength="4"
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    value={password}
                                    onChange={onChange}
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
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