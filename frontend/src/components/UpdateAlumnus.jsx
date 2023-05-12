import React, { useEffect, useState } from 'react'

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
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios'
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const UpdateAlumnus = () => {

    const token = localStorage.getItem('jwt');

    const [action, setAction] = useState('Personal Info')

    const [pid, setPid] = useState('')
    const [advices, setAdvices] = useState([])
    const [stories, setStories] = useState([])
    const [profile, setProfile] = useState({
        // id: '',
        // first_name: '',
        // last_name: '',
        // sex: '',
        // degree: '',
        // major: '',
        // graduation: ''
    })
    const [jobs, setJobs] = useState([])

    const setProfileAction = () => {
        setAction('Personal Info')
    }

    const setAdviceAction = () => {
        setAction('My Advices')
    }

    const setStoriesAction = () => {
        setAction('My Stories')
    }

    const setJobsAction = () => {
        setAction('My Jobs')
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
                const response = await axios.get("http://localhost:5000/alumni/profile/", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                setProfile(response.data)
                //console.log("profile getted")
                console.log(profile.sex)
                setPid(profile.id)
                //alert(response.data.id)
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

    useEffect(() => {
        const getAdvices = async () => {
            try {
                const response = await axios.get("http://localhost:5000/advices/alumni", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                setAdvices(response.data.advices)
            }
            catch (err) {
                console.log(err.response.data.error)
                setText(err.response.data.error)
                setSeverity('error')
                setOpen(true)
            }
        }
        getAdvices()
    }, [])

    useEffect(() => {
        const getStories = async () => {
            try {
                const response = await axios.get("http://localhost:5000/stories/alumni", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                setStories(response.data.stories)
                //console.log(stories)
            }
            catch (err) {
                console.log(err.response.data.error)
                setText(err.response.data.error)
                setSeverity('error')
                setOpen(true)
            }
        }
        getStories()
    }, [])

    useEffect(() => {
        const getJobs = async () => {
            try {
                const response = await axios.get("http://localhost:5000/alumni/jobs", {
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
                setText(err.response.data.error || err.response.data.message)
                setSeverity('error')
                setOpen(true)
            }
        }
        getJobs()
    }, [token])

    const onAdviceDelete = async (id) => {
        setAdvices(prevData => prevData.filter(item => item._id !== id));
        //console.log('deleted')
    }

    const onStoryDelete = async (id) => {
        setStories(prevData => prevData.filter(item => item._id !== id));
        //console.log('deleted')
    }


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
                            <ListItemButton onClick={setAdviceAction}>
                                <ListItemText primary='Advices' />
                            </ListItemButton>
                            <Divider />
                            <ListItemButton onClick={setStoriesAction}>
                                <ListItemText primary='Stories' />
                            </ListItemButton>
                            <Divider />
                            <ListItemButton onClick={setJobsAction}>
                                <ListItemText primary='Jobs' />
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
                        {action === 'Personal Info' ?
                            <>
                                <UpdateAlumnusProfile key={profile.id} props={profile} />


                            </>
                            : action === 'My Advices' ?
                                <>
                                    {advices.map((advice, index) => {
                                        let obj = advice
                                        obj.index = index + 1
                                        return (<UpdateAdvice key={advice._id} props={obj} onDelete={() => onAdviceDelete(advice._id)} />)
                                    })}
                                </>
                                : action === 'My Stories' ?
                                    <>
                                        {stories.map((story, index) => {
                                            let obj = story
                                            obj.index = index + 1
                                            return (<UpdateStory key={story._id} props={obj} onDelete={() => onStoryDelete(story._id)} />)
                                        })}
                                    </>
                                    :
                                    <>
                                        <AddJob
                                        // props={profile.id} 
                                        />
                                        <br />
                                        {jobs.map((job, index) => {
                                            //console.log(index)
                                            let obj = job
                                            obj.index = index + 1
                                            return (<UpdateJob key={job.job_id} props={obj} />)
                                        })}
                                    </>
                        }
                    </Box>
                </>
            </Box>
        </>
    );
}

export default UpdateAlumnus