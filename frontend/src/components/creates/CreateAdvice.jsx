import React, { useState } from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
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

const CreateAdvice = () => {

    const token = localStorage.getItem('jwt');

    const [advice, setAdvice] = useState({
        category: '',
        title: '',
        content: ''
    })

    const { category, title, content } = advice;

    const onChange = e => {
        setAdvice((prevState) => ({
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
            const response = await axios.post("http://localhost:5000/advices",
                advice,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

            setSeverity('success')
            setText("Advice successfully created!")

            setAdvice({
                category: '',
                title: '',
                content: ''
            })

        }
        catch (err) {
            console.log(err.response.data)
            setSeverity('error')
            setText(err.response.data.message)
        }
        setOpen(true)
    }

    const theme = createTheme();

    return (
        <>
            <br />
            <br />
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="md">
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
                            marginTop: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'left',
                        }}
                    >


                        <Paper sx={{ p: 4, }} elevation={4} >
                            <Typography component="h1" variant="h4" textAlign='left'>
                                Create Advice
                            </Typography>
                            <Box component="form" onSubmit={onSubmit} sx={{ mt: 4 }}>
                                <Grid container spacing={2}>


                                    <Grid item xs={4} sm={4}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Category *</InputLabel>
                                            <Select
                                                labelId='demo-simple-select-label'
                                                name='category'
                                                id="category"
                                                value={category}
                                                label="category"
                                                onChange={onChange}
                                                required
                                            >

                                                <MenuItem value={'General'}>General</MenuItem>
                                                <MenuItem value={'BSCS'}>BSCS</MenuItem>
                                                <MenuItem value={'BBA'}>BBA</MenuItem>
                                                <MenuItem value={'SSLA'}>SSLA</MenuItem>
                                                <MenuItem value={'BSAF'}>BSAF</MenuItem>
                                                <MenuItem value={'BSS'}>BSS</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={8} sm={8} />


                                    <Grid item xs={6} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="title"
                                            label="Title"
                                            name="title"
                                            onChange={onChange}
                                            value={title}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            id="outlined-multiline-static"
                                            multiline
                                            rows={4}
                                            label="Content"
                                            name="content"
                                            onChange={onChange}
                                            value={content}
                                            placeholder="Enter text here..."
                                            fullWidth
                                            required
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
                                            Create
                                        </Button>
                                    </Grid>
                                </Grid>



                            </Box>
                        </Paper>
                        <br />

                        <Typography variant='subtitle1' textAlign='left'>
                            What are Advices ?
                        </Typography>
                        <Typography variant='caption' textAlign='left'>
                            Alumni often provide valuable advice to current students and recent graduates that can help them navigate their journey towards success. This advice can be general or specific to a certain degree, and it draws from the alumni's own experiences and knowledge.
                        </Typography>
                    </Box>

                </Container>
            </ThemeProvider>
        </>
    )
}

export default CreateAdvice