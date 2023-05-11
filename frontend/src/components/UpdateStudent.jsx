import React, { useState, useEffect } from 'react'

import UpdateAlumnusProfile from './updates/UpdateAlumnusProfile'
import UpdateJob from './updates/UpdateJob'
import AddJob from './creates/AddJob'
import UpdateAdvice from './updates/UpdateAdvice'
import UpdateStory from './updates/UpdateStory'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Navbar from './navbars/Navbar'
import UpdateStudentProfile from './updates/UpdateStudentProfile'
import axios from 'axios'
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const UpdateStudent = () => {

    const token = localStorage.getItem('jwt')

    //const sid = 10000
    const [action, setAction] = useState('Personal Info')

    const [profile, setProfile] = useState({})

    const setProfileAction = () => {
        setAction('Personal Info')
    }

    const drawerWidth = 250;

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
                const response = await axios.get("http://localhost:5000/student/", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                setProfile(response.data)
                console.log("profile getted")
            }
            catch (err) {
                console.log(err.response.data.error)
                setText(err.response.data.error)
                setSeverity('error')
                setOpen(true)
            }
        }
        getProfile()
    }, [token])

    return (
        <>
            <Box sx={{ display: 'flex', marginTop: 10 }}>

                <CssBaseline />
                <>

                    <AppBar
                        position="absolute"
                        sx={{
                            zIndex: 0,
                            width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, mt: 8.6
                        }}
                    >
                        <Toolbar>
                            <Typography variant="h6" noWrap component="div">
                                {action}
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <Drawer
                        position='absolute'
                        sx={{
                            zIndex: 0,
                            width: drawerWidth,
                            mt: 50,
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                width: drawerWidth,
                                boxSizing: 'border-box',
                            },
                        }}
                        variant="permanent"
                        anchor="left"
                    >
                        <Toolbar />

                        <List>
                            <Divider />
                            <ListItemButton onClick={setProfileAction}>
                                <ListItemText primary='Personal Info' />
                            </ListItemButton>
                            <Divider />

                        </List>
                    </Drawer>
                    <Box
                        component="main"
                        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
                    >
                        <Snackbar
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            open={open}
                            onClose={handleClose}
                            autoHideDuration={5000}>
                            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                                {text}
                            </Alert>

                        </Snackbar>
                        <Toolbar />
                        <UpdateStudentProfile key={profile.id} props={profile} />
                    </Box>
                </>
            </Box>
        </>
    );
}

export default UpdateStudent