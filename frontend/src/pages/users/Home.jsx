import React, { Fragment, useState, useEffect, } from 'react'

import { Box, CircularProgress, Paper, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import home_1 from "../../images/home_3.jpg"
import logo from '../../images/AlumNet_home_1.png'
import advices from '../../images/advice_1.jpg'
import stories from '../../images/story_1.jpg'
import alumnus from '../../images/alumnus_1.jpg'
import grad from '../../images/home_0.jpg'
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
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
    const token = localStorage.getItem('jwt');

    const [story, setStory] = useState([])
    const [profile, setProfile] = useState({})
    const [profile1, setProfile1] = useState({})

    const [advice, setAdvice] = useState([])
    const [profile2, setProfile2] = useState({})
    const [profile3, setProfile3] = useState({})

    useEffect(() => {

        const getStories = async () => {

            // setLikedStories([])
            try {
                const response = await axios.get("http://localhost:5000/stories", {
                    params: {
                        'sort': 'popularity',
                        'order': null,
                        'page': 1
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                const res = await axios.get("http://localhost:5000/alumni/profile/" + response.data.stories[0].ERP, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                setProfile(res.data)

                const resp = await axios.get("http://localhost:5000/alumni/profile/" + response.data.stories[1].ERP, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                setProfile1(resp.data)
                //let stories = response.data.stories
                // setTotalPages(response.data.totalPages)
                //setCurrentPage(response.data.currentPage)
                //setStory("hallo")
                console.log("ao" + response.data.stories)
                setStory(response.data.stories)

            }
            catch (err) {
                //console.log(err.response.data.error)
                console.log(err.response.data.error)
            }
        }

        getStories()


    }, [token])

    useEffect(() => {

        const getAdvices = async () => {

            // setLikedStories([])
            try {
                const response = await axios.get("http://localhost:5000/advices", {
                    params: {
                        'sort': 'popularity',
                        'order': null,
                        'page': 1
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                const res = await axios.get("http://localhost:5000/alumni/profile/" + response.data.advices[0].ERP, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                setProfile2(res.data)

                const resp = await axios.get("http://localhost:5000/alumni/profile/" + response.data.advices[1].ERP, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                setProfile3(resp.data)
                //let stories = response.data.stories
                // setTotalPages(response.data.totalPages)
                //setCurrentPage(response.data.currentPage)
                //setStory("hallo")
                //console.log("ao" + response.data.advices)
                setAdvice(response.data.advices)

            }
            catch (err) {
                //console.log(err.response.data.error)
                console.log(err.response.data.error)
            }
        }

        getAdvices()


    }, [token])

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
                    <Grid container spacing={2} >
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
                                    display: { xs: 'none', sm: 'flex', md: 'flex' },
                                    flexGrow: 0.1,
                                    flexShrink: 1,
                                    fontWeight: 100,
                                    letterSpacing: '',
                                    textDecoration: 'none',
                                    fontSize: { xs: 'none', sm: '2vw', md: '1.6vw' }
                                }}>
                                {'AlumNet is an alumni tracking system designed to help educational institutions stay connected with their former students. By providing a platform for alumni to connect with each other and their alma mater, AlumNet fosters a sense of...'}
                            </Typography>
                            <Typography>

                                <Typography sx={{ display: { xs: 'none', md: 'flex' } }}>
                                    <a href='#about_us' style={{ color: 'beige', }}>
                                        Continue Reading
                                    </a>
                                </Typography>


                            </Typography>
                        </Grid>
                    </Grid>

                </div>
            </div >

            <div style={{ position: 'relative', marginTop: -4 }}>
                <img
                    src={alumnus}
                    alt="bg"
                    style={{ maxWidth: '100%', maxHeight: '50%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '60%', left: '15%', transform: 'translate(-10%, -10%)' }}>
                    <Grid container spacing={2} sx={{ my: 0 }}>
                        <Grid item xs={2}>
                            <Typography
                                variant='h3'
                                color='gold'
                                sx={{
                                    // display: { xs: 'none', sm: 'flex', md: 'flex' },
                                    fontSize: { xs: '6vw', sm: '5.5vw', md: '3.5vw' }
                                }}>
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
                                    display: { xs: 'none', sm: 'none', md: 'flex' },
                                    flexGrow: 0.1,
                                    flexShrink: 0.1,
                                    fontWeight: 100,
                                    letterSpacing: '',
                                    textDecoration: 'none',
                                    fontSize: { xs: 'none', sm: 'none', md: '1.5vw' }
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

            <div style={{ position: 'relative', marginTop: -4 }}>
                <img
                    src={advices}
                    alt="bg"
                    style={{ maxWidth: '100%', maxHeight: '50%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '30%', left: '15%', transform: 'translate(-10%, -30%)' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography
                                variant='h3'
                                color='darkviolet'
                                sx={{
                                    // display: { xs: 'none', sm: 'flex', md: 'flex' },
                                    fontSize: { xs: '6vw', sm: '5.5vw', md: '3.5vw' }
                                }}>
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
                                    display: { xs: 'none', sm: 'none', md: 'flex' },
                                    flexGrow: 0.1,
                                    flexShrink: 0.1,
                                    fontWeight: '100',
                                    letterSpacing: '',
                                    textDecoration: 'none',
                                    fontSize: { xs: 'none', sm: 'none', md: '1.5vw' }
                                }}>
                                {`Alumni often provide valuable advice to current students and recent graduates that can help them navigate their journey towards success.
                                 This advice can be general or specific to a certain degree, and it draws from the alumni's own experiences and knowledge.
                                  These pieces of advice may include tips on time management, resilience, networking, mentorship, pursuing opportunities, and more. `}
                            </Typography>
                            {/* {advice.length !== 0 && profile3 !== null && profile2 !== null ? <>
                                <br />
                                <br />
                                <Typography
                                    variant='h6'
                                    color='black'
                                    sx={{
                                        display: { xs: 'none', sm: 'none', md: 'flex' },
                                        flexGrow: 0.1,
                                        flexShrink: 0.1,
                                        fontWeight: 100,
                                        letterSpacing: '',
                                        textDecoration: 'none',
                                        fontSize: { xs: 'none', sm: 'none', md: '2vw' },
                                        mb: 2
                                    }}>
                                    Featured Advices
                                </Typography>
                                <Grid container>

                                    <Grid maxWidth='sm' item xs={6}>
                                        <CssBaseline />

                                        <Box
                                            sx={{
                                                marginTop: -1,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'left',
                                                marginBottom: -1
                                            }}
                                        >
                                            <Paper sx={{
                                                p: 4,
                                                backgroundColor: 'white'
                                            }} elevation={4} >


                                                <Grid container spacing={2} alignItems="center">
                                                    <Grid item xs={4} sm={4} md={4}>
                                    
                                                        <img
                                                            src={`${'http://localhost:5000'}/${profile2.image}`}
                                                            alt={profile2.first_name}
                                                            style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={8}>
                                                        <Link to={`/advices/${advice[0].ERP}/${advice[0]._id}`} style={{ textDecoration: 'none' }} >

                                                            <Typography variant="h6" align="left" sx={{ fontWeight: 'bold', marginBottom: 1, mt: -10, color: 'black', mb: -8 }}>
                                                                Title: {advice[0].title}
                                                            </Typography>

                                                        </Link>
                                                        <Link to={`/advices/${advice[0].ERP}/${advice[0]._id}`} style={{ textDecoration: 'none' }} >

                                                            <Typography variant="h6" align="left" sx={{ fontWeight: 'bold', marginBottom: 1, mt: -10, color: 'black', mb: -8 }}>
                                                                Category: {advice[0].category}
                                                            </Typography>

                                                        </Link>
                                                        <br />

                                                        <br />

                                                        <br />


                                                        <Link to={`/advices/${advice[0].ERP}/${advice[0]._id}`} style={{ textDecoration: 'none' }} >

                                                            <Typography variant="body2" align="left" sx={{ fontStyle: 'italic', color: 'black', }}>
                                                                Date Created: {new Date(advice[0].date).toLocaleDateString()}
                                                            </Typography>

                                                        </Link>

                                                        <Link to={`/advices/${advice[0].ERP}/${advice[0]._id}`} style={{ textDecoration: 'none' }} >

                                                            <Typography variant="body1" align="left" sx={{ fontStyle: 'italic', color: 'black' }}>
                                                                By: {advice[0].Name} {advice[0].ERP}
                                                            </Typography>
                                                            <Typography variant="body1" align="left" sx={{ fontStyle: 'italic', color: 'black' }}>
                                                                Likes: {advice[0].popularity}
                                                            </Typography>

                                                        </Link>
                                                    </Grid>


                                                </Grid>


                                            </Paper>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={0} />

                                    <Grid maxWidth='sm' item xs={6}>
                                        <CssBaseline />

                                        <Box
                                            sx={{
                                                marginTop: -1,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'left',
                                                marginBottom: -1
                                            }}
                                        >
                                            <Paper sx={{
                                                p: 4,
                                                backgroundColor: 'white'
                                            }} elevation={4} >


                                                <Grid container spacing={2} alignItems="center">
                                                    <Grid item xs={4} sm={4} md={4}>
                                                        
                                                        <img
                                                            src={`${'http://localhost:5000'}/${profile3.image}`}
                                                            alt={profile3.first_name}
                                                            style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={8}>
                                                        <Link to={`/advices/${advice[1].ERP}/${advice[1]._id}`} style={{ textDecoration: 'none' }} >

                                                            <Typography variant="h6" align="left" sx={{ fontWeight: 'bold', marginBottom: 1, mt: -10, color: 'black', mb: -8 }}>
                                                                Title: {advice[1].title}
                                                            </Typography>

                                                        </Link>
                                                        <Link to={`/advices/${advice[1].ERP}/${advice[1]._id}`} style={{ textDecoration: 'none' }} >

                                                            <Typography variant="h6" align="left" sx={{ fontWeight: 'bold', marginBottom: 1, mt: -10, color: 'black', mb: -8 }}>
                                                                Title: {advice[1].category}
                                                            </Typography>

                                                        </Link>
                                                        <br />

                                                        <br />

                                                        <br />


                                                        <Link to={`/advices/${advice[1].ERP}/${advice[1]._id}`} style={{ textDecoration: 'none' }} >

                                                            <Typography variant="body2" align="left" sx={{ fontStyle: 'italic', color: 'black', }}>
                                                                Date Created: {new Date(advice[1].date).toLocaleDateString()}
                                                            </Typography>

                                                        </Link>

                                                        <Link to={`/advices/${advice[1].ERP}/${advice[1]._id}`} style={{ textDecoration: 'none' }} >

                                                            <Typography variant="body1" align="left" sx={{ fontStyle: 'italic', color: 'black' }}>
                                                                By: {advice[1].Name} {advice[1].ERP}
                                                            </Typography>
                                                            <Typography variant="body1" align="left" sx={{ fontStyle: 'italic', color: 'black' }}>
                                                                Likes: {advice[1].popularity}
                                                            </Typography>

                                                        </Link>
                                                    </Grid>


                                                </Grid>


                                            </Paper>
                                        </Box>
                                    </Grid>
                                </Grid>

                            </>
                                :
                                <Box display="flex" justifyContent="center">
                                    <CircularProgress sx={{ mt: 10, mb: 10 }} />
                                </Box>
                            } */}
                            <Button variant='contained' color='inherit' size='large' component={Link} to="/advices">
                                View all advices
                            </Button>
                        </Grid>
                    </Grid>

                </div>
            </div>

            <div style={{ position: 'relative', marginTop: -7 }}>
                <img
                    src={stories}
                    alt="bg"
                    style={{ maxWidth: '100%', maxHeight: '50%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '30%', left: '15%', transform: 'translate(-10%, -30%)' }}
                //style={{ position: 'absolute', top: '55%', left: '45%', transform: 'translate(-10%, -10%)' }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography
                                variant='h3'
                                color='black'
                                sx={{
                                    // display: { xs: 'none', sm: 'flex', md: 'flex' },
                                    fontSize: { xs: '6vw', sm: '5.5vw', md: '3.5vw' }
                                }}>
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
                                    display: { xs: 'none', sm: 'none', md: 'flex' },
                                    flexGrow: 0.1,
                                    flexShrink: 0.1,
                                    fontWeight: 100,
                                    letterSpacing: '',
                                    textDecoration: 'none',
                                    fontSize: { xs: 'none', sm: 'none', md: '1.5vw' }
                                }}>
                                {`Alumni stories are narratives about the journey from graduation to achieving one's career goals.
                                 They offer valuable insights and wisdom for current students and recent graduates,
                                  inspiring them to pursue their dreams and overcome obstacles.
                                   By sharing stories, alumni stay connected to their alma mater and to each other,
                                    creating a sense of belonging and community. `}
                            </Typography>
                            {story.length !== 0 && profile !== null && profile1 !== null ? <>
                                <br />
                                <br />
                                <Typography
                                    variant='h6'
                                    color='black'
                                    sx={{
                                        display: { xs: 'none', sm: 'none', md: 'flex' },
                                        flexGrow: 0.1,
                                        flexShrink: 0.1,
                                        fontWeight: 100,
                                        letterSpacing: '',
                                        textDecoration: 'none',
                                        fontSize: { xs: 'none', sm: 'none', md: '2vw' },
                                        mb: 2
                                    }}>
                                    Featured Stories
                                </Typography>
                                <Grid container>

                                    <Grid maxWidth='sm' item xs={5}>
                                        <CssBaseline />

                                        <Box
                                            sx={{
                                                marginTop: -1,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'left',
                                                marginBottom: -1
                                            }}
                                        >
                                            <Paper sx={{
                                                p: 4,
                                                backgroundColor: 'white'
                                            }} elevation={4} >


                                                <Grid container spacing={2} alignItems="center">
                                                    <Grid item xs={4} sm={4} md={4}>
                                                        {/* <img
                                        src={miru}
                                        alt='logo'
                                        style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}
                                    /> */}
                                                        <img
                                                            src={`${'http://localhost:5000'}/${profile.image}`}
                                                            alt={profile.first_name}
                                                            style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={8}>
                                                        <Link to={`/stories/${story[0].ERP}/${story[0]._id}`} style={{ textDecoration: 'none' }} >

                                                            <Typography variant="h6" align="left" sx={{ fontWeight: 'bold', marginBottom: 1, mt: -10, color: 'black', mb: -8 }}>
                                                                Title: {story[0].title}
                                                            </Typography>

                                                        </Link>
                                                        <br />

                                                        <br />

                                                        <br />


                                                        <Link to={`/stories/${story[0].ERP}/${story[0]._id}`} style={{ textDecoration: 'none' }} >

                                                            <Typography variant="body2" align="left" sx={{ fontStyle: 'italic', color: 'black', }}>
                                                                Date Created: {new Date(story[0].date).toLocaleDateString()}
                                                            </Typography>

                                                        </Link>

                                                        <Link to={`/stories/${story[0].ERP}/${story[0]._id}`} style={{ textDecoration: 'none' }} >

                                                            <Typography variant="body1" align="left" sx={{ fontStyle: 'italic', color: 'black' }}>
                                                                By: {story[0].Name} {story[0].ERP}
                                                            </Typography>
                                                            <Typography variant="body1" align="left" sx={{ fontStyle: 'italic', color: 'black' }}>
                                                                Likes: {story[0].popularity}
                                                            </Typography>

                                                        </Link>
                                                    </Grid>


                                                </Grid>


                                            </Paper>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={2} />
                                    <Grid maxWidth='sm' item xs={5}>
                                        <CssBaseline />

                                        <Box
                                            sx={{
                                                marginTop: -1,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'left',
                                                marginBottom: -1
                                            }}
                                        >
                                            <Paper sx={{
                                                p: 4,
                                                backgroundColor: 'white'
                                            }} elevation={4} >


                                                <Grid container spacing={2} alignItems="center">
                                                    <Grid item xs={4} sm={4} md={4}>
                                                        {/* <img
                                        src={miru}
                                        alt='logo'
                                        style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}
                                    /> */}
                                                        <img
                                                            src={`${'http://localhost:5000'}/${profile1.image}`}
                                                            alt={profile1.first_name}
                                                            style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={8}>
                                                        <Link to={`/stories/${story[1].ERP}/${story[1]._id}`} style={{ textDecoration: 'none' }} >

                                                            <Typography variant="h6" align="left" sx={{ fontWeight: 'bold', marginBottom: 1, mt: -10, color: 'black', mb: -8 }}>
                                                                Title: {story[1].title}
                                                            </Typography>

                                                        </Link>
                                                        <br />

                                                        <br />

                                                        <br />


                                                        <Link to={`/stories/${story[1].ERP}/${story[1]._id}`} style={{ textDecoration: 'none' }} >

                                                            <Typography variant="body2" align="left" sx={{ fontStyle: 'italic', color: 'black', }}>
                                                                Date Created: {new Date(story[1].date).toLocaleDateString()}
                                                            </Typography>

                                                        </Link>

                                                        <Link to={`/stories/${story[1].ERP}/${story[1]._id}`} style={{ textDecoration: 'none' }} >

                                                            <Typography variant="body1" align="left" sx={{ fontStyle: 'italic', color: 'black' }}>
                                                                By: {story[1].Name} {story[1].ERP}
                                                            </Typography>
                                                            <Typography variant="body1" align="left" sx={{ fontStyle: 'italic', color: 'black' }}>
                                                                Likes: {story[1].popularity}
                                                            </Typography>

                                                        </Link>
                                                    </Grid>


                                                </Grid>


                                            </Paper>
                                        </Box>
                                    </Grid>
                                </Grid>

                            </>
                                :
                                <Box display="flex" justifyContent="center">
                                    <CircularProgress sx={{ mt: 10, mb: 10 }} />
                                </Box>
                            }

                            <Button variant='contained' color='inherit' size='large' component={Link} to="/stories" sx={{ mt: 4 }}>
                                View All Stories
                            </Button>
                        </Grid>
                    </Grid>

                </div>
            </div>

            <div style={{ position: 'relative', marginTop: -4, marginBottom: -4 }}>
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
                                    // display: { xs: 'flex', md: 'flex' },
                                    fontSize: { xs: '6vw', sm: '5.5vw', md: '3.5vw' },
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
                                    display: { xs: 'flex', sm: 'flex', md: 'flex' },
                                    flexGrow: 0.1,
                                    flexShrink: 0.1,
                                    fontWeight: 100,
                                    letterSpacing: '',
                                    textDecoration: 'none',
                                    fontSize: { xs: '2vw', sm: '1.8vw', md: '1.5vw' }
                                }}>
                                {`AlumNet is an alumni tracking system designed to help educational institutions
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
                                    display: { xs: 'none', sm: 'flex', md: 'flex' },
                                    flexGrow: 0.1,
                                    flexShrink: 0.1,
                                    fontWeight: 100,
                                    letterSpacing: '',
                                    textDecoration: 'none',
                                    fontSize: { xs: 'none', sm: '1.8vw', md: '1.5vw' }
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
                                    display: { xs: 'none', sm: 'none', md: 'flex' },
                                    flexGrow: 0.1,
                                    flexShrink: 0.1,
                                    fontWeight: 100,
                                    letterSpacing: '',
                                    textDecoration: 'none',
                                    fontSize: { xs: 'none', sm: 'none', md: '1.5vw' }
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