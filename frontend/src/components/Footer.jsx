import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const Footer = () => {

    function Copyright() {
        return (
            <Typography variant="body2" color="white" align="center">
                {'Copyright © '}
                <Link color="inherit" to="/">
                    AlumNet
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

    const description = 'AlumNet';
    const title = 'hellodwdwad wDWQDWDWQD EWFTBHYNJ YJTR HGER ';

    return (
        <Box component="footer" sx={{ bgcolor: 'grey', py: 6 }}>
            <Container maxWidth="lg">
                <Typography variant="h6" align="center" gutterBottom color='white'>
                    {title}
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="white"
                    component="p"
                >
                    {description}
                </Typography>
                <Copyright />
            </Container>
        </Box>
    );
}

export default Footer;