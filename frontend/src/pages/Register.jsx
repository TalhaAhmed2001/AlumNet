import React, { useState } from 'react'
import RegisterStudent from '../components/signups/RegisterStudent'
import RegisterAlumnus from '../components/signups/RegisterAlumnus'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const Register = () => {

    const [user, setUser] = useState('alumnus')

    const setStudent = (e) => {
        setUser('student')
    }

    const setAlumnus = (e) => {
        setUser('alumnus')
    }

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className='container'>
            
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tabs value={value} onChange={handleChange} centered >
                    <Tab label="Sign Up as Alumnus" onClick={setAlumnus}/>
                    <Tab label="Sign Up as Student" onClick={setStudent}/>
                </Tabs>

            </Box>
            {user === 'student' ? <RegisterStudent /> : <RegisterAlumnus />}
        </div >
    )
}

export default Register