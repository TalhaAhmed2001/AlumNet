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

//import SaveIcon from '@mui/icons-material/Save';

const UpdateStory = props => {

    const [story, setStory] = useState({
        ERP: props.ERP,
        Name: props.Name,
        title: props.title,
        content: props.content
    })

    const { ERP, Name, title, content } = story;

    const onChange = e => {
        setStory((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        })
        )
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setStory({
            ERP: props.ERP,
            Name: props.Name,
            title: props.title,
            content: props.content
        })
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


                    <Paper sx={{ p: 4, }} elevation={4} >

                        <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
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

                                <Grid item xs={12} sm={2}>

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 0, mb: -2 }}
                                        color='success'
                                    >
                                        {/* <SaveIcon/> */}
                                        Update
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={2}>

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 0, mb: -2 }}
                                        color='error'
                                    >
                                        Delete
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