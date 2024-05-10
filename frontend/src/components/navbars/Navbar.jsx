import React from 'react'
import PropTypes from 'prop-types'
import AdminNavbar from './AdminNavbar';
import StudentNavbar from './StudentNavbar';
import AlumnusNavbar from './AlumnusNavbar';
import { Link } from 'react-router-dom';

import AlumNet from '../../images/AlumNet_home_1.png'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';
const Navbar = () => {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: 'blueviolet' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>

          <Link to="/">
            <img src={AlumNet} alt="logo" height='60vmin' component={Link} href='/' />

          </Link>

          <>
            
            <Grid container alignItems='center'>

              <Grid item md={0.5} />

              <Grid item xs={4} sx={{ display: { xs: 'flex', md: 'none' } }}>
                
              </Grid>
              <Grid item lg={1.5}>
                <Typography variant="h6" component="div" sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 0.1 }}>
                  
                </Typography>
              </Grid>

              <Grid item lg={1.5}>
                <Typography variant="h6" component="div" sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 0.1 }}>
                  
                </Typography>
              </Grid>

              <Grid item lg={1.5}>
                <Typography variant="h6" component="div" sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 0.1 }}>
                  
                </Typography>
              </Grid>

              <Grid item lg={1.5}>
                <Typography variant="h6" component="div" sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 0.1 }}>
                  
                </Typography>
              </Grid>

              <Grid item sm={4} />

              <Grid item md={0.8}>

                <Button color='inherit' component={Link} to='/login'>
                  Login
                </Button>

              </Grid>
              <Grid item md={0.5}>

              <Button color="inherit" component={Link} to='/register'>
                  Register
                </Button>

              </Grid>
            </Grid>

          </>

        </Toolbar>
      </AppBar>
    </Box >
  );
}

// Navbar.propTypes = { user_id: PropTypes.number }

export default Navbar