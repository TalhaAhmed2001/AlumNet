import React from 'react'

import { Link } from 'react-router-dom';
import home_1 from "../../images/home_3.jpg"
import Typography from '@mui/material/Typography';
import logo from '../../images/AlumNet_home_1.png'
import advice from '../../images/advice_1.jpg'
import story from '../../images/story_1.jpg'
import alumnus from '../../images/alumnus_1.jpg'
import grad from '../../images/home_0.jpg'
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';

const Home = () => {

    // const styles = {
    //     background: {
    //         //backgroundImage: `url(${station})`,
    //         backgroundRepeat: 'no-repeat',
    //         //backgroundColor: theme.palette.background.main,
    //         backgroundSize: 'cover',
    //         backgroundPosition: 'center',
    //         minHeight: '10vh',
    //     }
    // };

    return (
        <>

            <div style={{ position: 'relative' }}>
                <img
                    id='home'
                    src={home_1}
                    alt="bg"
                    style={{ maxWidth: '100%', maxHeight: '50%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '60%', left: '50%', transform: 'translate(-5%, -60%)' }}>
                    <Grid container spacing={2}>
                        <Grid item >
                            <img
                                src={logo}
                                alt="grad ppl"
                                style={{ minWidth: '50%', maxWidth: '100%', maxHeight: '100%', flexGrow: 0.1, flexShrink: 0.1 }}
                            />
                        </Grid>

                        <Grid item>
                            <Typography
                                color='ghostwhite'
                                variant="h5"
                                gutterBottom
                                sx={{
                                    //ml: -28,
                                    display: { xs: 'flex', md: 'flex' },
                                    flexGrow: 0.1,
                                    flexShrink: 0.1,
                                    fontWeight: 100,
                                    letterSpacing: '',
                                    textDecoration: 'none'
                                }}>
                                {'AlumNet is an alumni tracking system designed to help educational institutions stay connected with their former students. By providing a platform for alumni to connect with each other and their alma mater, AlumNet fosters a sense of...'}
                            </Typography>
                            <Typography>

                                <a href='#about_us' style={{ color: 'beige' }}>
                                    Continue Reading
                                </a>

                            </Typography>
                        </Grid>
                    </Grid>

                </div>
            </div>

            <div style={{ position: 'relative' }}>
                <img
                    src={alumnus}
                    alt="bg"
                    style={{ maxWidth: '100%', maxHeight: '50%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '60%', left: '15%', transform: 'translate(-10%, -10%)' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h3' color='gold'>
                                Alumni
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                color='white'
                                variant="h5"
                                gutterBottom
                                sx={{
                                    //ml: -28,
                                    display: { xs: 'flex', md: 'flex' },
                                    flexGrow: 0.1,
                                    flexShrink: 0.1,
                                    fontWeight: 100,
                                    letterSpacing: '',
                                    textDecoration: 'none',
                                }}>
                                {` Alumni are former students who play a vital role in their alma mater's success.
                                 They offer career advice and mentorship to current students, create networking opportunities,
                                  and contribute to fundraising efforts.
                                   Overall, alumni are a valuable resource for educational institutions and the next generation of students.`}
                            </Typography>
                            <Button variant='contained' color='inherit' size='large' component={Link} to="/alumni">
                                View Alumni
                            </Button>
                        </Grid>
                    </Grid>

                </div>
            </div>

            <div style={{ position: 'relative' }}>
                <img
                    src={advice}
                    alt="bg"
                    style={{ maxWidth: '100%', maxHeight: '50%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '30%', left: '15%', transform: 'translate(-10%, -50%)' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h3' color='darkviolet'>
                                Advices
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography
                                color='white'
                                variant="h5"
                                gutterBottom
                                sx={{
                                    //ml: -28,
                                    display: { xs: 'flex', md: 'flex' },
                                    flexGrow: 0.1,
                                    flexShrink: 0.1,
                                    fontWeight: '100',
                                    letterSpacing: '',
                                    textDecoration: 'none',
                                }}>
                                {`Alumni often provide valuable advice to current students and recent graduates that can help them navigate their journey towards success.
                                 This advice can be general or specific to a certain degree, and it draws from the alumni's own experiences and knowledge.
                                  These pieces of advice may include tips on time management, resilience, networking, mentorship, pursuing opportunities, and more. `}
                            </Typography>
                            <Button variant='contained' color='inherit' size='large' component={Link} to="/advices">
                                View featured advices
                            </Button>
                        </Grid>
                    </Grid>

                </div>
            </div>

            <div style={{ position: 'relative' }}>
                <img
                    src={story}
                    alt="bg"
                    style={{ maxWidth: '100%', maxHeight: '50%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '55%', left: '45%', transform: 'translate(-10%, -10%)' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h3' color='black'>
                                Stories
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                color='white'
                                variant="h5"
                                gutterBottom
                                sx={{
                                    //ml: -28,
                                    display: { xs: 'flex', md: 'flex' },
                                    flexGrow: 0.1,
                                    flexShrink: 0.1,
                                    fontWeight: 100,
                                    letterSpacing: '',
                                    textDecoration: 'none',
                                }}>
                                {`Alumni stories are narratives about the journey from graduation to achieving one's career goals.
                                 They offer valuable insights and wisdom for current students and recent graduates,
                                  inspiring them to pursue their dreams and overcome obstacles.
                                   By sharing stories, alumni stay connected to their alma mater and to each other,
                                    creating a sense of belonging and community. `}
                            </Typography>
                            <Button variant='contained' color='inherit' size='large' component={Link} to="/stories">
                                View Stories
                            </Button>
                        </Grid>
                    </Grid>

                </div>
            </div>

            <div style={{ position: 'relative' }}>
                <img
                    src={grad}
                    alt="bg"
                    id='about_us'
                    style={{ maxWidth: '100%', maxHeight: '50%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '30%', left: '20%', transform: 'translate(-10%, -10%)' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography
                                variant='h3'
                                color='white'
                                sx={{
                                    //ml: -28,
                                    display: { xs: 'flex', md: 'flex' },
                                    flexGrow: 0.1,
                                    flexShrink: 0.1,
                                    fontWeight: 'bold',
                                    letterSpacing: '',
                                    textDecoration: 'none',
                                }}>
                                About Us
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                color='white'
                                variant="h6"
                                gutterBottom
                                sx={{
                                    //ml: -28,
                                    display: { xs: 'flex', md: 'flex' },
                                    flexGrow: 0.1,
                                    flexShrink: 0.1,
                                    fontWeight: 100,
                                    letterSpacing: '',
                                    textDecoration: 'none',
                                }}>
                                {`AlumNet is an alumni management system designed to help educational institutions
                                 stay connected with their former students.
                                 By providing a platform for alumni to connect with each other and their alma mater,
                                  AlumNet fosters a sense of community and belonging that lasts long after graduation.
                                  `}
                            </Typography>

                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                color='white'
                                variant="h6"
                                gutterBottom
                                sx={{
                                    //ml: -28,
                                    display: { xs: 'flex', md: 'flex' },
                                    flexGrow: 0.1,
                                    flexShrink: 0.1,
                                    fontWeight: 100,
                                    letterSpacing: '',
                                    textDecoration: 'none',
                                }}>
                                {`At the same time, institutions can use AlumNet to track alumni engagement
                                     and measure the impact of their alumni programs.
                                     With features like event management, job boards, and fundraising tools,
                                   AlumNet makes it easy for alumni to stay engaged and give back to their school.
                                    Whether you're a recent graduate or a seasoned alum,
                                     AlumNet is the perfect tool for staying connected and making a difference in the lives of future graduates. `}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                color='white'
                                variant="h6"
                                gutterBottom
                                sx={{
                                    //ml: -28,
                                    display: { xs: 'flex', md: 'flex' },
                                    flexGrow: 0.1,
                                    flexShrink: 0.1,
                                    fontWeight: 100,
                                    letterSpacing: '',
                                    textDecoration: 'none',
                                }}>
                                {`Whether you're a recent graduate or a seasoned alum,
                                     AlumNet is the perfect tool for staying connected and making a difference in the lives of future graduates. `}
                            </Typography>
                        </Grid>
                    </Grid>

                </div>
            </div>

        </>
    )
}

export default Home