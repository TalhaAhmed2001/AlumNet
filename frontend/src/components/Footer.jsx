import React from 'react';
import { Box, Container, Link, Typography } from '@mui/material';

const Footer = ({ hideFooter }) => {

    if (hideFooter) {
        return null;
    }

    const description = 'An alumni tracking system designed to help educational institutions stay connected with their former students';
    const title = 'AlumNet';

    return (
        <Box component="footer" sx={{ bgcolor: '#110024', py: 6, mt: 0,position:'relative', zIndex:1 }}>
            <Container maxWidth="lg">
                <Typography variant="h6" align="center" gutterBottom color="white" fontFamily='sans'>
                    {title}
                </Typography>
                {/* <Typography variant="subtitle1" align="center" color="white" component="p">
                    {description}
                </Typography> */}
                <Typography variant="body2" align="center" color="white">
                    <Link href="/" color="inherit">
                        Home
                    </Link>
                    {' | '}
                    <Link href="/" color="inherit">
                        About
                    </Link>
                    {' | '}
                    <Link href="/" color="inherit">
                        Contact
                    </Link>
                </Typography>
                <Box mt={2}>
                    <Typography variant="body2" align="center" color="white">
                        <strong>Follow us:</strong>{' '}
                        <Link href="https://twitter.com" color="inherit">
                            Twitter
                        </Link>
                        {' | '}
                        <Link href="https://facebook.com" color="inherit">
                            Facebook
                        </Link>
                        {' | '}
                        <Link href="https://instagram.com" color="inherit">
                            Instagram
                        </Link>
                    </Typography>
                </Box>
                {/* <Box mt={2}>
                    <Typography variant="body2" align="center" color="white">
                        <strong>Terms of Service</strong> | <strong>Privacy Policy</strong>
                    </Typography>

                </Box> */}

                <Box mt={2}>
                    <Typography variant="body2" align="center" color="white">
                        <strong>Contact us:</strong> contact@alumnet.com
                    </Typography>
                    <Typography variant="body2" align="center" color="white">
                        <strong>Phone:</strong> +1234567890
                    </Typography>
                    <Typography variant="body2" align="center" color="white">
                        <strong>Fax:</strong> +1234567890
                    </Typography>
                </Box>


                {/* <Box mt={4}>
                    <Typography variant="body2" align="center" color="white">
                        <strong>Careers:</strong> careers@alumnet.com
                    </Typography>
                </Box>
                <Box mt={4}>
                    <Typography variant="body2" align="center" color="white">
                        <strong>Investor Relations:</strong> investors@alumnet.com
                    </Typography>
                </Box>
                <Box mt={4}>
                    <Typography variant="body2" align="center" color="white">
                        <strong>Media Inquiries:</strong> media@alumnet.com
                    </Typography>
                </Box>
                <Box mt={4}>
                    <Typography variant="body2" align="center" color="white">
                        <strong>Partnerships:</strong> partnerships@alumnet.com
                    </Typography>
                </Box>
                <Box mt={4}>
                    <Typography variant="body2" align="center" color="white">
                        <strong>Support:</strong> support@alumnet.com
                    </Typography>
                </Box> */}


                <Box mt={1}>
                    <Typography variant="body2" color="white" align="center">
                        {'Website built with love using '}
                        <Link href="https://mui.com" color="inherit" target="_blank" rel="noopener noreferrer">
                            Material-UI
                        </Link>
                    </Typography>
                    <Typography variant="body2" color="white" align="center">
                        {'Powered by '}
                        <Link href="https://reactjs.org" color="inherit" target="_blank" rel="noopener noreferrer">
                            React
                        </Link>

                    </Typography>
                </Box>

                <Box mt={2} mb={-4}>
                    <Typography variant="body2" color="white" align="center">
                        {'© '}
                        <Link color="inherit" href="/">
                            AlumNet
                        </Link>{' '}
                        {new Date().getFullYear()}
                        {'.'}
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}

export default Footer;
