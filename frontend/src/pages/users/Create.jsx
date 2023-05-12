import React, { useState } from 'react'

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CreateStory from '../../components/creates/CreateStory';
import CreateAdvice from '../../components/creates/CreateAdvice';
import Navbar from '../../components/navbars/Navbar';
import Typography from '@mui/material/Typography';

const Create = () => {

    const [action, setAction] = useState('Create Advice')

    const setAdvice = (e) => {
        setAction('Create Advice')
    }

    const setStory = (e) => {
        setAction('Create Story')
    }

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ backgroundColor: 'floralwhite' }}>
            <br />
            <br />
            <br />

            <Box sx={{ width: '100%', backgroundColor: 'floralwhite', marginBottom: 0 }}>
                <Tabs value={value} onChange={handleChange} centered >
                    <Tab label="Advice" onClick={setAdvice} />
                    <Tab label="Story" onClick={setStory} />
                </Tabs>

            </Box>

            <Box sx={{
                backgroundColor: 'floralwhite'
            }}>
                {action === 'Create Advice' ?
                    <>
                        <CreateAdvice />

                    </>
                    :
                    <CreateStory />}

            </Box>
            <br />
        </Box>
    )
}

export default Create