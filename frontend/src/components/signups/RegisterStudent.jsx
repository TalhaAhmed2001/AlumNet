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
import { Input } from '@mui/material';

import UpgradeIcon from '@mui/icons-material/Upgrade';

const RegisterStudent = () => {

    const navigate = useNavigate()

    const [profile, setProfile] = useState({
        first_name: '',
        last_name: '',
        id: '',
        password: '',
        sex: '',
        degree: '',
        image: null
    })

    const { first_name, last_name, id, password, sex, degree, image } = profile;

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
        setOpen(false)

        setSeverity('error')

        if (first_name.trim() === '') {
            setText("'First Name' field cannot be empty")
            setOpen(true)
            return false
        }
        else if (first_name.length > 20) {
            setText("'First Name' must be less than 20 characters")
            setOpen(true)
            return false
        }
        else if (last_name.trim() === '') {
            setText("'Last Name' field cannot be empty")
            setOpen(true)
            return false
        }
        else if (last_name.length > 20) {
            setText("'Last Name' must be less than 20 characters")
            setOpen(true)
            return false
        }
        else if (id.trim() === '') {
            setText("'ID' field cannot be empty")
            setOpen(true)
            return false
        }
        else if (isNaN(id)) {
            setText("'ID' must be a number")
            setOpen(true)
            return false
        }
        else if (id.length < 5) {
            setText("'ID' must be 5 digits only")
            setOpen(true)
            return false
        }
        else if (sex === '') {
            setText("'Sex' field cannot be empty")
            setOpen(true)
            return false
        }
        else if (sex !== 'M' && sex !== 'F') {
            setText("Invalid value for field 'Sex'")
            setOpen(true)
            return false
        }
        else if (password.trim() === '') {
            setText("'Password' field cannot be empty")
            setOpen(true)
            return false
        }
        else if (password.length > 20 || password.length < 8) {
            setText("'Password' must be between 8 and 20 characters")
            setOpen(true)
            return false
        }
        else if (degree.trim() === '') {
            setText("'Degree' field cannot be empty")
            setOpen(true)
            return false
        }
        else if (degree.length > 20 || degree.length < 3) {
            setText("'Degree' must be between 3 and 20 characters")
            setOpen(true)
            return false
        }
        else if (image == null) {
            setText("Please choose a Profile Picture")
            setOpen(true)
            return false
        }


        try {
            const formData = new FormData();
            formData.append('first_name', first_name);
            formData.append('last_name', last_name);
            formData.append('id', id);
            formData.append('password', password);
            formData.append('sex', sex);
            formData.append('degree', degree);
            formData.append('image', image); // Append the image file to the form data

            const response = await axios.post("http://localhost:5000/student", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the content type to multipart form data
                },
            });

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
            setTimeout(() => {
                navigate('/login')
            },
                2500);

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
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Paper sx={{ p: 4, width: 500 }} elevation={0} square>
                        <Typography component="h1" variant="h5" textAlign='center'>
                            Sign up as Student
                        </Typography>
                        <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={1.4}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="first_name"
                                        fullWidth
                                        id="first_name"
                                        label="First Name"
                                        onChange={onChange}
                                        value={first_name}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
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
                                        fullWidth
                                        id="id"
                                        label="ID"
                                        name="id"
                                        type='text'
                                        onChange={onChange}
                                        value={id}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Sex</InputLabel>
                                        <Select
                                            labelId='demo-simple-select-label'
                                            name='sex'
                                            id="sex"
                                            value={sex}
                                            label="Sex"
                                            onChange={onChange}
                                        >
                                            <MenuItem value={'M'}>Male</MenuItem>
                                            <MenuItem value={'F'}>Female</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        name="password"
                                        label="Password*"
                                        type="password"
                                        id="password"
                                        onChange={onChange}
                                        value={password}
                                        helperText="*between 8 and 20 characters"
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        id="degree"
                                        label="Degree"
                                        name="degree"
                                        onChange={onChange}
                                        value={degree}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <InputLabel htmlFor="file-input" variant='body1'>Select a Profile Picture</InputLabel>
                                    {/* <Button ></Button> */}
                                    {/* <input
                                        accept="image/*"
                                        id="image"
                                        name="image"
                                        type="file"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            setProfile((prevState) => ({
                                                ...prevState,
                                                image: file,
                                            }));
                                        }}
                                    /> */}
                                    <Button variant="outlined" size='small' component="label">
                                        Upload Image
                                        <Input
                                            accept="image/*"
                                            id="image"
                                            name="image"
                                            type="file"
                                            style={{ display: 'none' }}
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                setProfile((prevState) => ({
                                                    ...prevState,
                                                    image: file,
                                                }));
                                            }}
                                        />
                                        <UpgradeIcon sx={{ ml: 0, mr: -1 }} />
                                    </Button>
                                    {image && (
                                        <Typography variant='caption'>
                                            Image selected: {image.name}
                                        </Typography>
                                    )}
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