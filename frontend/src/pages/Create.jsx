import React from 'react'

import Box from '@mui/material/Box';
import CreateStory from '../components/creates/CreateStory';
import CreateAdvice from '../components/creates/CreateAdvice';
import Navbar from '../components/navbars/Navbar';

const Create = () => {
    return (
        <>
        <Navbar user_id={3}/>
            <Box sx={{
                        marginTop: 15,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                <CreateStory />
                <CreateAdvice />
            </Box>
        </>
    )
}

export default Create