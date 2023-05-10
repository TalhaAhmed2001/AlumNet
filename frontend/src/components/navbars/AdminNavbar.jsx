import React from 'react'
import { Link } from 'react-router-dom';

import AlumNet from '../../images/AlumNet_home_1.png'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const AdminNavbar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" zindex='0'>
                <Toolbar sx={{ justifyContent: 'space-between' }}>

                    <Link to="/">
                        <img src={AlumNet} alt="logo" height='60vmin' component={Link} href='/' />
                    </Link>

                    <>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 0.1 }}>
                            <Button sx={{ my: 2, color: 'white', display: 'block', ml: 4 }} component={Link} to='/pendingprofiles'>
                                Pending
                            </Button>
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 0.1 }} >
                            <Button sx={{ my: 2, color: 'white', display: 'block' }} component={Link} to='/promotingstudents'>
                                Promotions
                            </Button>
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 0.1 }}>
                            <Button sx={{ my: 2, color: 'white', display: 'block' }} component={Link} to='/eradication'>
                                Eradicate
                            </Button>
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 0.1 }}>
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        </Typography>

                    </>

                    <Button color="inherit" onClick={() => {
                        localStorage.removeItem('jwt');
                        localStorage.removeItem('user_role');
                        window.location.assign('/')
                    }}
                    // component={Link} to='/login'
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default AdminNavbar