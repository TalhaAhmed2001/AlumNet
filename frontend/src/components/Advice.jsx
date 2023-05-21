import { Container, CssBaseline, Typography, Button } from '@mui/material'
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Paper from '@mui/material/Paper';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Advice = ({ props }) => {

    const token = localStorage.getItem('jwt')

    const { _id, ERP, Name, date, category, title, content } = props

    const [popularity, setPopularity] = useState(props.popularity)

    const [liked, setLiked] = useState(props.liked)
    //console.log('liked' + liked)

    const like = async () => {

        try {
            const response = await axios.patch('http://localhost:5000/advices/like/' + _id,
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
                            marginBottom: -1,
                        }}
                    >
                        <Paper sx={{ p: 4, backgroundColor: 'white' }} elevation={4}>
                        
                            <Grid container spacing={2} alignItems='center'>
                                <Grid item xs={12} sm={9}>
                                <Link to={`/advices/${ERP}/${_id}`} style={{ textDecoration: 'none' }} >

                                    <Typography variant='h6' align='left' sx={{ fontWeight: 'bold', marginTop: 0, color:'black' }}>
                                        Title: {title}
                                    </Typography>
                                    </Link>
                                </Grid>

                                <Grid item xs={12} sm={3}>
                                <Link to={`/advices/${ERP}/${_id}`} style={{ textDecoration: 'none' }} >

                                    <Typography variant='body2' align='right' sx={{ fontStyle: 'italic',color:'black' }}>
                                        Date Created: {new Date(date).toLocaleDateString()}
                                    </Typography>
                                    </Link>
                                </Grid>

                                <Grid item xs={12} sm={12}>
                                <Link to={`/advices/${ERP}/${_id}`} style={{ textDecoration: 'none' }} >

                                    <Typography variant='body1' align='left' sx={{ marginTop: -1,color:'black' }}>
                                        Category: {category}
                                    </Typography>
                                    </Link>
                                </Grid>

                                <Grid item xs={12} sm={12}>
                                <Link to={`/advices/${ERP}/${_id}`} style={{ textDecoration: 'none' }} >

                                    <Typography variant='body2' align='left' sx={{ marginBottom: 1,color:'black' }}>
                                        Content: {content}
                                    </Typography>
                                    </Link>
                                </Grid>

                                <Grid item xs={6}>
                                    <Button variant='outlined' size='medium' onClick={like}>
                                        {liked ? (
                                            <ThumbUpAltIcon sx={{ fontSize: 24, marginLeft: 0, marginRight: 1, }} />
                                        ) : (
                                            <ThumbUpOffAltIcon sx={{ fontSize: 24, marginLeft: 0, marginRight: 1 }} />
                                        )}
                                        {popularity}
                                    </Button>
                                </Grid>

                                <Grid item xs={6}>
                                <Link to={`/advices/${ERP}/${_id}`} style={{ textDecoration: 'none' }} >

                                    <Typography variant='body1' align='right' sx={{ fontStyle: 'italic',color:'black' }}>
                                        By: {Name} {ERP}
                                    </Typography>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>

            </Container>
        </>
    )
}

export default Advice