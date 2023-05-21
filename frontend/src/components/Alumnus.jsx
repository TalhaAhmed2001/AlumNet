import { Container, CssBaseline, Typography } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import miru from '../images/miru.jpg'
import Paper from '@mui/material/Paper';
import axios from 'axios';

import { Link } from 'react-router-dom';
const Alumnus = ({ props }) => {

    const token = localStorage.getItem('jwt')

    const { id, first_name, last_name, graduation, degree, major, image } = props

    const [jobs, setJobs] = useState([])

    useEffect(() => {
        const getJobs = async () => {
            try {
                const response = await axios.get("http://localhost:5000/alumni/jobs/" + id, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                setJobs(response.data)
                //console.log("hello wolrd")
                console.log(response.data)
            }
            catch (err) {
                console.log("helloe?")
                console.log(err.response.data.error || err.response.data.message)
            }
        }
        getJobs()
    }, [token])

    return (
        <>
            <br />
            <br />
            <Container component="main" maxWidth='lg'>
                <CssBaseline />
                <Link to={`/alumni/${id}`} style={{ textDecoration: 'none' }} >

                    <Box
                        sx={{
                            marginTop: -1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'left',
                            marginBottom: -1,
                        }}
                    >
                        <Paper sx={{ p: 4, backgroundColor: 'white' }} elevation={4}>
                            <Grid container spacing={2}>
                                <Grid item xs={4} sm={4} md={2}>
                                    {/* <img
                                        src={miru}
                                        alt='logo'
                                        style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}
                                    /> */}
                                    <img
                                        src={`${'http://localhost:5000'}/${props.image}`}
                                        alt={props.title}
                                        style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={8} md={10}>
                                    <Typography variant='h5' align='left' sx={{ mt: -1, fontWeight: 'bold' }}>
                                        {first_name} {last_name}
                                    </Typography>
                                    <Typography variant='h6' align='left' sx={{ mt: 2 }}>
                                        Class of {graduation}
                                    </Typography>
                                    <Typography variant='h6' align='left' sx={{ mt: 0 }}>
                                        Degree: {degree}
                                    </Typography>
                                    <Typography variant='h6' align='left' sx={{ mt: 0 }}>
                                        Major: {major}
                                    </Typography>
                                    <Typography variant='h6' sx={{ mt: 2 }}>
                                        Job list:
                                        {jobs.length !== 0 ? (
                                            jobs.map((job, index) => (
                                                <Typography
                                                    key={job.job_id}
                                                    variant='body1'
                                                    component='span'
                                                    sx={{ display: 'block' }}
                                                >
                                                    {`${index + 1}. ${job.role} at ${job.employer}`}
                                                </Typography>
                                            ))
                                        ) : (
                                            <Typography variant='body1' sx={{ fontStyle: 'italic', marginTop: 1 }}>
                                                No jobs listed.
                                            </Typography>
                                        )}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant='h6' align='right' sx={{ mt: -1 }}>
                                        ID: {id}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>

                </Link>
            </Container>
        </>
    )
}

export default Alumnus