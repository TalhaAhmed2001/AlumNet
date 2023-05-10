import { Container, CssBaseline, Typography } from '@mui/material'
import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import miru from '../images/miru.jpg'
import Paper from '@mui/material/Paper';

const Alumnus = () => {
    return (
        <>
            <br />
            <br />
            <Container component="main" maxWidth='lg'>
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
                    <Paper sx={{ p: 4, }} elevation={4} >

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={2} md={2}>
                                <img src={miru} alt='logo' style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant='h5' textAlign='left' sx={{ mt: -1, fontWeight: 'bold' }}>
                                    {first_name}{' '}{last_name}
                                </Typography>
                                <Typography variant='h6' textAlign='left' sx={{ mt: 0 }}>
                                    {id}
                                </Typography>
                                <Typography variant='body1' textAlign='left' sx={{ mt: 2 }}>
                                    {'Year of Graduation: '}{graduation}
                                </Typography>
                                <Typography variant='body1' textAlign='left' sx={{ mt: 0 }}>
                                    {'Degree : '}{degree}
                                </Typography>
                                <Typography variant='body1' textAlign='left' sx={{ mt: 0 }}>
                                    {'Major : '}{major}
                                </Typography>
                                <Typography variant='body1' textAlign='left' sx={{ mt: 0 }}>
                                    {'Sex : '}{sex}
                                </Typography>
                            </Grid>


                            <Grid item xs={12} sm={12}>
                            </Grid>
                            <Grid item xs={12} sm={12}>

                            </Grid>
                            <Grid item xs={12} sm={12}>
                            </Grid>
                            <Grid item xs={12} sm={12}>

                            </Grid>


                        </Grid>

                    </Paper>
                </Box>
            </Container>
        </>
    )
}

export default Alumnus