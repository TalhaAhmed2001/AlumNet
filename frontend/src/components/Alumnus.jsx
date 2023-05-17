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

    const { id, first_name, last_name, graduation, degree, major } = props

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
                //console.log(response.data[0])
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
                        <Paper sx={{
                            p: 4,
                            backgroundColor: 'white'
                        }} elevation={4} >

                            <Grid container spacing={2}>
                                <Grid item xs={4} sm={4} md={2}>
                                    <img src={miru} alt='logo' style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }} />
                                </Grid>
                                <Grid item xs={12} sm={9}>
                                    <Typography variant='h5' textAlign='left' sx={{ mt: -1, fontWeight: 'bold' }}>
                                        {first_name}{' '}{last_name}
                                    </Typography>
                                    <Typography variant='h6' textAlign='left' sx={{ mt: 2 }}>
                                        {'Class of '}{graduation}
                                    </Typography>
                                    <Typography variant='h6' textAlign='left' sx={{ mt: 0 }}>
                                        {'Degree : '}{degree}
                                    </Typography>
                                    <Typography variant='h6' textAlign='left' sx={{ mt: 0 }}>
                                        {'Major : '}{major}
                                    </Typography>
                                    <Typography variant='h6'>
                                        Job list:

                                        {jobs.map((job, index) => {
                                            //console.log(index)
                                            let obj = job
                                            obj.index = index + 1
                                            return (
                                                // <Typography key={job.job_id}>
                                                <Fragment key={job.job_id}>
                                                    {' '}{job.role}{' at '}{job.employer} {' | '}
                                                </Fragment>
                                                // </Typography>
                                            )
                                        })}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant='h6' textAlign='right' sx={{ mt: -1 }}>
                                        {id}
                                        {/* {jobs.map((job, index) => {
                                            //console.log(index)
                                            let obj = job
                                            obj.index = index + 1
                                            return (
                                                // <Typography key={job.job_id}>
                                                <>
                                                    {' '}{job.role}{' at '}{job.employer} {' \n '}
                                                </>
                                                // </Typography>
                                            )
                                        })} */}
                                    </Typography>
                                </Grid>




                                {/* <Typography>
                                    Roles:

                                    {jobs.map((job, index) => {
                                        //console.log(index)
                                        let obj = job
                                        obj.index = index + 1
                                        return (
                                            // <Typography key={job.job_id}>
                                            <>
                                                {' '}{job.role} {','}
                                            </>
                                            // </Typography>
                                        )
                                    })}
                                </Typography> */}


                                {/* <Grid item xs={12} sm={12}>

                                </Grid>
                                <Grid item xs={12} sm={12}>
                                </Grid>
                                <Grid item xs={12} sm={12}>

                                </Grid> */}


                            </Grid>

                        </Paper>
                    </Box>
                </Link>
            </Container>
        </>
    )
}

export default Alumnus