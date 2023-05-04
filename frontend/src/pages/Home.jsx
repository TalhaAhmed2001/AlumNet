import React from 'react'

import { Link } from 'react-router-dom';
import Navbar from '../components/navbars/Navbar'
import home_1 from '../images/home_1.jpg'

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
const Home = props => {

    const id = props.user_id

    const styles = {
        background: {
            //backgroundImage: `url(${station})`,
            backgroundRepeat: 'no-repeat',
            //backgroundColor: theme.palette.background.main,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '10vh',
        }
    };

    return (
        <>
            <Navbar user_id={id} />
            <Box sx={{ marginTop: 0, marginBottom: 0, alignItems: 'center' }}>
                <img
                    //src={home_1}
                    alt="bg"
                    style={{ backgroundImage: `url(${home_1})`, backgroundRepeat: "no-repeat", backgroundSize: "contain" }}
                // background-repeat= 'no-repeat'
                // background-size= 'cover'
                // background-position= 'center center'
                />
            </Box>
            <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="md">
                <Typography variant="h2" component="h1" gutterBottom>
                    AlumNet
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    {'AlumNet is an alumni tracking system designed to help educational institutions stay connected with their former students. By providing a platform for alumni to connect with each other and their alma mater, AlumNet fosters a sense of community and belonging that lasts long after graduation.'}
                </Typography>
            </Container>

            {/* <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
                }}
            >
                <Container maxWidth="sm">
                    <Typography variant="body1">
                        My sticky footer can be found here.
                    </Typography>
                </Container>
            </Box> */}
        </>
    )
}

export default Home