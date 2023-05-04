import React,{useState} from 'react'

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

const UpdateAlumnus = () => {

    const [action, setAction] = useState('My Profile')

    const setProfile = () => {
        setAction('My Profile')
    }

    const setAdvice = () => {
        setAction('My Advices')
    }

    const setStories = () => {
        setAction('My Stories')
    }

    const setJobs = () => {
        setAction('My Jobs')
    }

    const drawerWidth = 250;

    return (
        <>
        <Box sx={{ display: 'flex' , marginTop: 10}}>
        
            <CssBaseline />
            <>
            
            <AppBar
                position="absolute"
                sx={{ zIndex:0,
                    width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, mt:8.6 }}
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
                    zIndex:0,
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
                    <ListItemButton onClick={setProfile}>
                        <ListItemText primary='Profile' />
                    </ListItemButton>
                    <Divider />
                    <ListItemButton onClick={setAdvice}>
                        <ListItemText primary='Advices' />
                    </ListItemButton>
                    <Divider />
                    <ListItemButton onClick={setStories}>
                        <ListItemText primary='Stories' />
                    </ListItemButton>
                    <Divider />
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Toolbar />
                {action === 'My Profile' ? <><UpdateAlumnusProfile /><br/><AddJob/> <br/><UpdateJob/></>: action === 'My Advices' ? <UpdateAdvice /> : <UpdateStory />}
            </Box>
            </>
        </Box>
        </>
    );
}

export default UpdateAlumnus