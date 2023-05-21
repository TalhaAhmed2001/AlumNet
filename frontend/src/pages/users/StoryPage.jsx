import { Container, CssBaseline, Divider, Typography } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import Paper from '@mui/material/Paper';

const StoryPage = () => {

    const token = localStorage.getItem('jwt');

    let { _id, ERP } = useParams()
    ERP = parseInt(ERP)

    const [story, setStory] = useState({})
    const [profile, setProfile] = useState({})

    // const { image, first_name, last_name, id } = profile
    const { title, content, Name, date } = story

    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('success')
    const [text, setText] = useState('')

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        const getStory = async () => {
            try {
                const response = await axios.get("http://localhost:5000/stories/alumnus/" + _id, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                setStory(response.data.story)
            }
            catch (err) {
                console.log(err.response.data.error)
                setText(err.response.data.error)
                setSeverity('error')
                setOpen(true)
            }
        }
        getStory()
    }, [_id, token])

    // useEffect(() => {
    //     const getProfile = async () => {
    //         try {
    //             const response = await axios.get("http://localhost:5000/alumni/profile/" + ERP, {
    //                 headers: {
    //                     'Authorization': `Bearer ${token}`
    //                 }
    //             })

    //             setProfile(response.data)
    //             //console.log("profile getted")
    //             //alert(response.data.id)
    //         }
    //         catch (err) {
    //             console.log(err.response.data.error)
    //             setText(err.response.data.error)
    //             setSeverity('error')
    //             setOpen(true)
    //         }
    //     }
    //     getProfile()
    // }, [ERP, token])

    return (
        <Box sx={{
            backgroundColor: 'black'
        }}>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Container component="main" maxWidth='lg'>
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
                        marginTop: -1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'left',
                        marginBottom: -1
                    }}
                >
                    <Paper sx={{
                        p: 4,
                        backgroundColor: 'white'
                    }} elevation={4} >


                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={9}>
                                <Typography variant="h6" align="left" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                                    Title: {title}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={3}>
                                <Typography variant="body2" align="right" sx={{ fontStyle: 'italic' }}>
                                    Date Created: {new Date(date).toLocaleDateString()}
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="body2" align="left" sx={{ marginBottom: 2 }}>
                                    Content: {content}
                                </Typography>
                            </Grid>

                            <Grid item xs={6}>
                                {/* <Button variant="outlined" size="medium" onClick={() => like()}>
                                        {liked ? (
                                            <ThumbUpAltIcon sx={{ fontSize: 24, marginLeft: 0, marginRight: 1 }} />
                                        ) : (
                                            <ThumbUpOffAltIcon sx={{ fontSize: 24, marginLeft: 0, marginRight: 1 }} />
                                        )}
                                        {popularity}
                                    </Button> */}
                            </Grid>

                            <Grid item xs={6}>
                                <Typography variant="body1" align="right" sx={{ fontStyle: 'italic' }}>
                                    By: {Name} {ERP}
                                </Typography>
                            </Grid>
                        </Grid>


                    </Paper>
                </Box>

            </Container >
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </Box>
    )
}

export default StoryPage