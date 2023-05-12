import React, { useState } from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import CreateIcon from '@mui/icons-material/Create';

const CreateStory = () => {

    const token = localStorage.getItem('jwt');

    const [story, setStory] = useState({
        title: '',
        content: ''
    })

    const { title, content } = story;

    const onChange = e => {
        setStory((prevState) => ({
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
            const response = await axios.post("http://localhost:5000/stories",
                story,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

            setSeverity('success')
            console.log(response.data)
            setText("Story successfully created!")

            setStory({
                category: '',
                title: '',
                content: ''
            })


        }
        catch (err) {
            console.log(err.response.data)
            setSeverity('error')
            setText(err.response.data)
        }
        setOpen(true)
    }

    const theme = createTheme();

    return (
        <>
            <br />
            <br />
            <br />
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth='md'>
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
                                Create Story
                            </Typography>
                            <Box component="form" onSubmit={onSubmit} sx={{ mt: 4 }}>
                                <Grid container spacing={2}>



                                    <Grid item xs={12} sm={6}>
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
                                            label="Content *"
                                            name="content"
                                            onChange={onChange}
                                            value={content}
                                            placeholder="Enter text here..."
                                            fullWidth
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={2.5}>

                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 0, mb: -2 }}
                                            color='secondary'
                                        >
                                            
                                            Create
                                            <CreateIcon sx={{ ml: 1, mr: -1 }} />

                                        </Button>
                                    </Grid>
                                </Grid>



                            </Box>
                        </Paper>
                        <br />
                        <br />
                        <Typography variant='subtitle1' textAlign='left'>
                            What are Stories ?
                        </Typography>
                        <Typography variant='caption' textAlign='left'>
                            Alumni stories are narratives about the journey from graduation to achieving one's career goals. They offer valuable insights and wisdom for current students and recent graduates, inspiring them to pursue their dreams and overcome obstacles. By sharing stories, alumni stay connected to their alma mater and to each other, creating a sense of belonging and community.
                        </Typography>
                    </Box>

                </Container>
            </ThemeProvider>
        </>
    )
}

export default CreateStory