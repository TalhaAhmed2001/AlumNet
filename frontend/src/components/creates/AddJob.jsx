import React, { useState } from 'react'

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const AddJob = () => {

    const token = localStorage.getItem('jwt');

    const [job, setJob] = useState({
        // id: parseInt(props),
        employer: '',
        role: '',
        date_start: '',
        date_end: ''
    })

    const { id, employer, role, date_start, date_end } = job;

    const onChange = e => {
        setJob((prevState) => ({
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

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/alumni/jobs",
                job,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )

            setSeverity('success')
            setText(response.data.message)
            console.log(response.data.message)

            setJob({
                id: '',
                employer: '',
                role: '',
                date_start: '',
                date_end: ''
            })
        }
        catch (err) {
            console.log(err.response.data.message)
            setSeverity('error')
            setText(err.response.data.error || err.response.data.message)
        }
        setOpen(true)
    }

    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="m">
                <CssBaseline />
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={open}
                    onClose={handleClose}
                    autoHideDuration={5000}>
                    <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                        {text}
                    </Alert>

                </Snackbar>
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'left',
                    }}
                >


                    <Paper sx={{ p: 4, }} elevation={4} >

                        <Typography component="h1" variant="h5" textAlign='left'>
                            Add
                        </Typography>
                        <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
                            <Grid container spacing={2}>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="employer"
                                        label="Employer"
                                        name="employer"
                                        onChange={onChange}
                                        value={employer}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={5} />
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="role"
                                        label="Role"
                                        name="role"
                                        onChange={onChange}
                                        value={role}
                                    />
                                </Grid>
                                <Grid item xs={6} xm={6} />

                                <Grid item xs={12} md={4} lg={2}>
                                    <TextField
                                        type='date'
                                        id="date_start"
                                        label="Start Date"
                                        name="date_start"
                                        onChange={onChange}
                                        InputLabelProps={{ shrink: true }}
                                        value={date_start}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={8} lg={10}>
                                    <TextField
                                        type='date'
                                        id="date_end"
                                        label="End Date"
                                        name="date_end"
                                        onChange={onChange}
                                        InputLabelProps={{ shrink: true }}
                                        value={date_end}
                                    />
                                </Grid>


                                <Grid item xs={12} sm={6} md={4} lg={2}>

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 0, mb: -2 }}
                                        color='secondary'
                                    >
                                        Add Job
                                    </Button>
                                </Grid>

                            </Grid>



                        </Box>
                    </Paper>
                </Box>

            </Container>
        </ThemeProvider>

    )
}

export default AddJob