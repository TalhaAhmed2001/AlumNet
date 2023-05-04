import React, { useState } from 'react'
import UpdateAlumnusProfile from '../components/updates/UpdateAlumnusProfile'
import UpdateJob from '../components/updates/UpdateJob'
import AddJob from '../components/creates/AddJob'
import UpdateAdvice from '../components/updates/UpdateAdvice'
import UpdateStory from '../components/updates/UpdateStory'
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
import Navbar from '../components/navbars/Navbar'
import UpdateStudentProfile from '../components/updates/UpdateStudentProfile'
import UpdateAlumnus from '../components/UpdateAlumnus'
import UpdateStudent from '../components/UpdateStudent'

const MyProfile = props => {

    const user_id = props.user_id
    
    return (
        <>
            <Navbar user_id={user_id}/>
            {user_id === 3 ? <UpdateAlumnus/> : <UpdateStudent/>}
        </>
    );
}

export default MyProfile