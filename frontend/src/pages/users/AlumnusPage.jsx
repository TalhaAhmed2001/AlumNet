import { Container, CssBaseline, Divider, Typography } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import miru from '../../images/miru.jpg'
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import { Link } from 'react-router-dom';

const Alumnus = () => {

    const token = localStorage.getItem('jwt');

    let { id } = useParams()
    id = parseInt(id)
    //console.log('this is id' + id)

    const [advices, setAdvices] = useState([])
    const [stories, setStories] = useState([])
    const [profile, setProfile] = useState({})
    const [jobs, setJobs] = useState([])

    const { first_name, last_name, graduation, degree, major } = profile

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
        const getProfile = async () => {
            try {
                const response = await axios.get("http://localhost:5000/alumni/profile/" + id, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                setProfile(response.data)
                //console.log("profile getted")
                //alert(response.data.id)
            }
            catch (err) {
                console.log(err.response.data.error)
                setText(err.response.data.error)
                setSeverity('error')
                setOpen(true)
            }
        }
        getProfile()
    }, [id, token])

    useEffect(() => {
        const getJobs = async () => {
            try {
                const response = await axios.get("http://localhost:5000/alumni/jobs/" + id, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                setJobs(response.data)
            }
            catch (err) {
                console.log(err.response.data.error || err.response.data.message)
                setText(err.response.data.error || err.response.data.message)
                setSeverity('error')
                setOpen(true)
            }
        }
        getJobs()
    }, [id, token])

    useEffect(() => {
        const getAdvices = async () => {
            try {
                const response = await axios.get("http://localhost:5000/advices/alumni/" + id, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                setAdvices(response.data.advices)
            }
            catch (err) {
                console.log(err.response.data.error)
                setText(err.response.data.error)
                setSeverity('error')
                setOpen(true)
            }
        }
        getAdvices()
    }, [id, token])

    useEffect(() => {
        const getStories = async () => {
            try {
                const response = await axios.get("http://localhost:5000/stories/alumni/" + id, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                setStories(response.data.stories)
                //console.log(stories)
            }
            catch (err) {
                console.log(err.response.data.error)
                setText(err.response.data.error)
                setSeverity('error')
                setOpen(true)
            }
        }
        getStories()
    }, [id, token])

    return (
        <Box sx={{
            backgroundColor: 'floralwhite'
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
                        marginBottom: -1,
                    }}
                >
                    <Paper sx={{ p: 4 }} elevation={4}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4} md={3}>
                                {/* <img
                                    src={miru}
                                    alt='logo'
                                    style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}
                                /> */}
                                <img
                                    src={`${'http://localhost:5000'}/${profile.image}`}
                                    alt={`${profile.image}`}
                                    style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}
                                />
                                {console.log(profile.image)}
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <Typography variant='h4' align='left' sx={{ mt: -1, fontWeight: 'bold' }}>
                                    {first_name} {last_name}
                                </Typography>
                                <Typography variant='h5' align='left' sx={{ mt: 1 }}>
                                    ID : {id}
                                </Typography>

                                <Typography variant='h6' align='left' sx={{ mt: 8 }}>
                                    Class of {graduation}
                                </Typography>
                                <Typography variant='h6' align='left' sx={{ mt: 1 }}>
                                    Degree: {degree}
                                </Typography>
                                <Typography variant='h6' align='left' sx={{ mt: 1 }}>
                                    Major: {major}
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant='h5' sx={{ fontWeight: 'bold', mt: 2 }}>
                                    Job list:
                                </Typography>
                            </Grid>

                            {jobs.map((job, index) => (
                                <Fragment key={job.job_id}>
                                    <Grid item xs={12} sm={9}>
                                        <Typography variant='h6' align='left'>
                                            {index + 1}. {job.role} at {job.employer}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <Typography variant='h6' align='left'>
                                            {new Date(job.date_start).toLocaleDateString()}{' - '}
                                            {job.date_end ? new Date(job.date_end).toLocaleDateString() : ''}
                                        </Typography>
                                    </Grid>
                                </Fragment>
                            ))}

                            <Grid item xs={12}>
                                <Divider sx={{ my: 2 }} />
                                <Typography variant='h5' sx={{ fontWeight: 'bold', mt: 2 }}>
                                    Advices:
                                </Typography>
                            </Grid>

                            {advices.map((advice) => (
                                <Fragment key={advice._id}>
                                    <Grid item xs={12} sm={12}>
                                        <Typography variant='h6' align='left' sx={{ mt: 0 }}>
                                            Title: {advice.title}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <Typography variant='body1' align='left' sx={{ mt: -1 }}>
                                            Category: {advice.category}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <Typography variant='body2' align='left' sx={{ mt: -1 }}>
                                            Content: {advice.content}
                                        </Typography>
                                    </Grid>
                                </Fragment>
                            ))}

                            <Grid item xs={12}>
                                <Divider sx={{ my: 2 }} />
                                <Typography variant='h5' sx={{ fontWeight: 'bold', mt: 2 }}>
                                    Stories:
                                </Typography>
                            </Grid>

                            {stories.map((story) => (
                                <Fragment key={story._id}>
                                    <Grid item xs={12} sm={12}>
                                        <Typography variant='h6' align='left' sx={{ mt: 0 }}>
                                            Title: {story.title}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <Typography variant='body2' align='left' sx={{ mt: -1 }}>
                                            Content: {story.content}
                                        </Typography>
                                    </Grid>
                                </Fragment>
                            ))}
                        </Grid>
                        <br />
                    </Paper>
                </Box>

            </Container >
        </Box>
    )
}

export default Alumnus