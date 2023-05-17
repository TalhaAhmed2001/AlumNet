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
//import SaveIcon from '@mui/icons-material/Save';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import SaveIcon from '@mui/icons-material/Save';
import SaveAsIcon from '@mui/icons-material/SaveAs';

const UpdateStory = ({ props, onDelete }) => {

    const token = localStorage.getItem('jwt');

    const story_num = props.index

    const [story, setStory] = useState({
        _id: props._id,
        ERP: props.ERP,
        //Name: props.Name,
        title: props.title,
        content: props.content
    })

    const { _id, ERP, Name, title, content } = story;

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

    const updateStory = async (e) => {

        e.preventDefault();

        try {
            const response = await axios.patch("http://localhost:5000/stories/" + _id,
                story,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

            setSeverity('success')
            setText('Story successfully updated')
        }
        catch (err) {
            console.log(err.response.data)
            setSeverity('error')
            setText(err.response.data.error || err.response.data.message)
        }
        setOpen(true)
    }

    const deleteStory = async (e) => {

        try {
            const response = await axios.delete("http://localhost:5000/stories/" + _id, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            setSeverity('success')
            setText('Story successfully deleted')
            //console.log('in updatestory')
            setOpen(true)
            setTimeout(() => {
                onDelete()
            },
                1000);
        }
        catch (err) {
            console.log(err.response.data.error)
            setSeverity('error')
            setText(err.response.data.error || err.response.data.message)
            setOpen(true)
        }

    }



    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="l">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'left',
                    }}
                >

                    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={open}
                        onClose={handleClose}
                        autoHideDuration={5000}>
                        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                            {text}
                        </Alert>

                    </Snackbar>
                    <Paper sx={{ p: 4, }} elevation={4} >
                        <Typography component="h1" variant="h5" textAlign='left' sx={{ mb: 2 }}>
                            Story {' #' + story_num}
                        </Typography>
                        <Box component="form" onSubmit={updateStory} sx={{ mt: 1 }}>
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

                                <Grid item xs={12} sm={12} md={4} lg={2}>

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 0, mb: -2 }}
                                        color='success'
                                    >
                                        {/* <SaveIcon/> */}
                                        Update
                                        <SaveAsIcon sx={{ ml: 1, mr: -1 }} />

                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4} lg={2}>

                                    <Button
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 0, mb: -2 }}
                                        color='error'
                                        onClick={() => deleteStory()}
                                    >
                                        Delete
                                        <DeleteOutlineIcon sx={{ ml: 1, mr: -1 }} />

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

export default UpdateStory