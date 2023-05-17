import { Container, CssBaseline, Typography } from '@mui/material'
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import axios from 'axios';
import { Paper, Button } from '@mui/material';


const Story = ({ props }) => {

    const token = localStorage.getItem('jwt')

    const { _id, ERP, Name, title, content, date } = props;

    const [popularity, setPopularity] = useState(props.popularity)

    //let liked_temp = props.liked
    const [liked, setLiked] = useState(props.liked)
   // setLiked(props.liked)
   //console.log(props)
    // console.log(likedBy)
    //console.log(props.liked)

    const like = async () => {

        try {
            const response = await axios.patch('http://localhost:5000/stories/like/' + _id,
                null,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )

            setPopularity(response.data.popularity)
            setLiked(response.data.liked)
            console.log(popularity)
        }
        catch (err) {
            console.log(err.response.data.error)
        }

    }

    return (
        <>
            <br />
            <br />
            <Container component="main" maxWidth='lg'>
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

                        <Grid container spacing={2} alignItems='center'>


                            <>
                                <Grid item xs={12} sm={9}>
                                    <Typography variant='h6' textAlign='left' sx={{ mt: 0 }}>
                                        Title : {" "}{title}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} sm={3}>
                                    <Typography variant='body2' textAlign='right' sx={{ mt: 0 }}>
                                        Date Created: {new Date(date).toISOString().slice(0, 10)}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} sm={12}>
                                    <Typography variant='body2' textAlign='left' sx={{ mb: 1 }}>
                                        Content : {" "}{content}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} >
                                    <Button variant='outlined' size='small' onClick={() => like()}>
                                
                                        {liked ?
                                            <ThumbUpAltIcon sx={{ ml: 0, mr: 2 }} />
                                            :
                                            <ThumbUpOffAltIcon sx={{ ml: 0, mr: 2 }} />
                                        }

                                        {/* <ThumbUpIcon sx={{  ml: 0, mr: 2 }} /> */}
                                        {popularity}

                                    </Button>
                                </Grid>
                                <Grid item xs={6} >
                                    <Typography variant='body1' textAlign='right'>
                                        By: {Name}{' '}{ERP}
                                    </Typography>
                                </Grid>
                            </>

                        </Grid>

                    </Paper>
                </Box>
            </Container>
        </>
    )
}

export default Story