import React, { useState } from 'react'
import RegisterStudent from '../../components/signups/RegisterStudent'
import RegisterAlumnus from '../../components/signups/RegisterAlumnus'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import login from '../../images/login.jpg'
import { Container, Paper } from '@mui/material';
const Register = () => {

    const [user, setUser] = useState('alumnus')

    const setStudent = (e) => {
        setUser('student')
    }

    const setAlumnus = (e) => {
        setUser('alumnus')
    }

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className='container'>
            <div style={{ position: 'relative' }}>
                <img
                    id='home'
                    src={login}
                    alt="bg"
                    style={{
                        width: '100%',
                        minHeight: '100%',
                        minWidth: '100%',
                        objectFit: 'cover',
                        margin: '-12.5vh 0', // Apply negative margin to crop the image beyond the height
                    }} />
            </div>
            {/* <Container component="main" maxWidth="xs"> */}
            <Container
                component="main"
                maxWidth="xs"
                sx={{
                    position: 'absolute',
                    top: '54%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                {/* <Paper sx={{ p: 0 }} elevation={0} square> */}
                <Box sx={{ width: '100%', }}>
                    <Paper sx={{  alignContent: 'center', alignItems: 'center' }}>
                        <Tabs value={value} onChange={handleChange} centered>
                            <Tab label="Sign Up as Alumnus" onClick={setAlumnus} />
                            <Tab label="Sign Up as Student" onClick={setStudent} />
                        </Tabs>
                    </Paper>
                    {user === 'student' ? <RegisterStudent /> : <RegisterAlumnus />}
                </Box>
                {/* </Paper> */}

            </Container>

        </div >
    )
}

export default Register