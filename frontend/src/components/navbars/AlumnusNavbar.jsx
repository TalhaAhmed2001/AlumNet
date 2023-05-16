import React from 'react'

import AlumNet from '../../images/AlumNet_home_1_1.png'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import Grid from '@mui/material/Grid';

const AlumnusNavbar = () => {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" >
                <Toolbar sx={{ justifyContent: 'space-between' }}>

                    <Link to="/">
                        <img src={AlumNet} alt="logo" height='60vmin' component={Link} href='/' />

                    </Link>

                    <>
                        <Grid container alignItems='center'>

                            <Grid item md={0.5} />

                            <Grid item lg={1.5}>
                                <Typography variant="h6" component="div" sx={{ display: { sm: 'none', md: 'flex' }, flexGrow: 0.1 }}>
                                    <Button sx={{ my: 2, color: 'white', display: 'block', }} component={Link} to='/alumni'>
                                        Alumni
                                    </Button>
                                </Typography>
                            </Grid>

                            <Grid item lg={1.5}>
                                <Typography variant="h6" component="div" sx={{ display: { sm: 'none', md: 'flex' }, flexGrow: 0.1 }}>
                                    <Button sx={{ my: 2, color: 'white', display: 'block' }} component={Link} to='/stories'>
                                        Stories
                                    </Button>
                                </Typography>
                            </Grid>

                            <Grid item lg={1.5}>
                                <Typography variant="h6" component="div" sx={{ display: { sm: 'none', md: 'flex' }, flexGrow: 0.1 }}>
                                    <Button sx={{ my: 2, color: 'white', display: 'block' }} component={Link} to='/advices'>
                                        Advices
                                    </Button>
                                </Typography>
                            </Grid>

                            <Grid item lg={1.5}>
                                <Typography variant="h6" component="div" sx={{ display: { sm: 'flex' }, flexGrow: 0.1 }}>
                                    <Button sx={{ my: 2, color: 'inherit', display: 'block' }} component={Link} to='/create'>
                                        Create
                                    </Button>
                                </Typography>
                            </Grid>

                            {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            </Typography> */}

                            <Grid item sm={3.5} />

                            <Grid item md={1.25}>

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


                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default AlumnusNavbar