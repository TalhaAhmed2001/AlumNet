import React from 'react'
import { Link } from 'react-router-dom';

import AlumNet from '../../images/AlumNet_home_1_1.png'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Grid from '@mui/material/Grid';

const StudentNavbar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" zindex='0' sx={{ backgroundColor: 'blueviolet' }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>

                    <Link to="/">
                        <img src={AlumNet} alt="logo" height='60vmin' component={Link} href='/' />

                    </Link>
                    <>
                        {/* <Typography variant="h6" component="div" sx={{ flexGrow: 0.1 }}>
                            <Button sx={{ my: 2, color: 'white', display: 'block', ml: 4 }} component={Link} to='/alumni'>
                                Alumni
                            </Button>
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 0.1 }}>
                            <Button sx={{ my: 2, color: 'white', display: 'block' }} component={Link} to='/stories'>
                                Stories
                            </Button>
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 0.1 }}>
                            <Button sx={{ my: 2, color: 'white', display: 'block' }} component={Link} to='/advices'>
                                Advices
                            </Button>
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 0.1 }}>
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        </Typography> */}

                        <Grid container alignItems='center'>

                            <Grid item md={0.5} />

                            <Grid item xs={4} sx={{ display: { xs: 'flex', md: 'none' } }}>

                            </Grid>
                            <Grid item lg={1.5}>
                                <Typography variant="h6" component="div" sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 0.1 }}>
                                    <Button sx={{ my: 2, color: 'white', display: 'block', }} component={Link} to='/alumni'>
                                        Alumni
                                    </Button>
                                </Typography>
                            </Grid>

                            <Grid item lg={1.5}>
                                <Typography variant="h6" component="div" sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 0.1 }}>
                                    <Button sx={{ my: 2, color: 'white', display: 'block' }} component={Link} to='/stories'>
                                        Stories
                                    </Button>
                                </Typography>
                            </Grid>

                            <Grid item lg={1.5}>
                                <Typography variant="h6" component="div" sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 0.1 }}>
                                    <Button sx={{ my: 2, color: 'white', display: 'block' }} component={Link} to='/advices'>
                                        Advices
                                    </Button>
                                </Typography>
                            </Grid>

                            <Grid item lg={1.5}>
                                <Typography variant="h6" component="div" sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 0.1 }}>

                                </Typography>
                            </Grid>


                            <Grid item sm={3.5} />

                            <Grid item md={1.25} sx={{ display: { xs: 'none', md: 'flex' } }}>

                                <Button color='inherit' component={Link} to='/myprofile'>
                                    My Profile
                                </Button>

                            </Grid>
                            <Grid item md={0.5}>

                                <Button color="inherit" onClick={() => { localStorage.removeItem('jwt'); localStorage.removeItem('user_role'); window.location.assign('/') }}
                                // component={Link} to='/login'
                                >
                                    Logout
                                </Button>

                            </Grid>
                        </Grid>


                    </>

                    {/* <Button color='inherit' component={Link} to='/myprofile'>
                        My Profile
                    </Button>

                    <Button color="inherit" onClick={() => { localStorage.removeItem('jwt'); localStorage.removeItem('user_role'); window.location.assign('/') }}
                    // component={Link} to='/login'
                    >
                        Logout
                    </Button> */}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default StudentNavbar