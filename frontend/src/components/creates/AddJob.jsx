import React,{useState} from 'react'

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

const AddJob = () => {

    const [job, setJob] = useState({
        id: '',
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

    const onSubmit = (e) => {
        e.preventDefault();
        setJob({
            id: '',
            employer: '',
            role: '',
            date_start: '',
            date_end: ''
        })
    }

    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="m">
                <CssBaseline />
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
                                Jobs
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

                                <Grid item sx={12} sm={2}>
                                    <TextField
                                        type='date'
                                        id="date_start"
                                        label="Start Date"
                                        name="date_start"
                                        onChange={onChange}
                                        InputLabelProps={{ shrink: true }}
                                        value={date_start}
                                    />
                                </Grid>
                                <Grid item sx={12} sm={10}>
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


                                <Grid item xs={12} sm={2}>

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 0, mb: -2 }}
                                        color='secondary'
                                    >
                                        Add
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