import React, { useState } from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';

const RegisterStudent = () => {

    const navigate = useNavigate()

    const [profile, setProfile] = useState({
        first_name: '',
        last_name: '',
        id: '',
        password: '',
        sex: '',
        degree: ''
    })

    const { first_name, last_name, id, password, sex, degree } = profile;

    const onChange = (e) => {
        //console.log("ON CHANGE KE ANDAR")
        setProfile((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        })
        )
    }

    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('success')
    const [text, setText] = useState('')

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const theme = createTheme();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/student", profile)

            setSeverity('success')
            setText(response.data.message)

            // setProfile({
            //     first_name: '',
            //     last_name: '',
            //     id: '',
            //     password: '',
            //     sex: '',
            //     degree: ''
            // })
            navigate('/login')
        }
        catch (err) {
            setSeverity('error')
            setText(err.response.data.message)
        }

        setOpen(true)
    }

    return (

        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={open}
                    onClose={handleClose}
                    autoHideDuration={5000}>
                    <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                        {text}
                    </Alert>

                </Snackbar>

                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Paper sx={{ p: 4, width: 500 }} elevation={5} square>
                        <Typography component="h1" variant="h5" textAlign='center'>
                            Sign up as Student
                        </Typography>
                        <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="first_name"
                                        required
                                        fullWidth
                                        id="first_name"
                                        label="First Name"
                                        onChange={onChange}
                                        value={first_name}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="last_name"
                                        label="Last Name"
                                        name="last_name"
                                        onChange={onChange}
                                        value={last_name}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="id"
                                        label="ID"
                                        name="id"
                                        type='Number'
                                        onChange={onChange}
                                        value={id}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Sex *</InputLabel>
                                        <Select
                                            labelId='demo-simple-select-label'
                                            name='sex'
                                            id="sex"
                                            value={sex}
                                            label="Sex"
                                            onChange={onChange}
                                            required
                                        >
                                            <MenuItem value={'M'}>Male</MenuItem>
                                            <MenuItem value={'F'}>Female</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        onChange={onChange}
                                        value={password}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="degree"
                                        label="Degree"
                                        name="degree"
                                        onChange={onChange}
                                        value={degree}
                                    />
                                </Grid>


                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                color="secondary"
                            >

                                Sign Up


                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/login" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Box>

            </Container>
        </ThemeProvider>

    )
}

export default RegisterStudent