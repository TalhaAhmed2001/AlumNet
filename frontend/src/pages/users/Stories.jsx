import React, { useState, useEffect } from 'react'
import Story from '../../components/Story'
import Navbar from '../../components/navbars/Navbar'

import { Box, Paper, Typography } from '@mui/material'

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Stories = () => {

    const token = localStorage.getItem('jwt');

    const [totalPages, setTotalPages] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [story, setStory] = useState([])

    const [query, setQuery] = useState({
        sort: '',
        order: '',
    })

    const [sort, setSort] = useState('')
    const [order, setOrder] = useState('')

    const onChange = () => {
        setQuery(() => ({
            sort: { sort },
            order: { order }
        }))
    }

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        console.log("value = " + value + " current page = " + currentPage)
    };

    const onSort = e => {
        setSort(e.target.value)
    }

    const onOrder = e => {
        setOrder(e.target.value)
    }

    useEffect(() => {
        const getStories = async () => {
            try {
                const response = await axios.get("http://localhost:5000/stories", {
                    params: {
                        'sort': `${sort}`,
                        'order': `${order}`,
                        'page': `${currentPage}`
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                setTotalPages(response.data.totalPages)
                //setCurrentPage(response.data.currentPage)
                setStory(response.data.stories)
            }
            catch (err) {
                //console.log(err.response.data.error)
                console.log(err.response.data.error)
            }
        }
        getStories()

    }, [query, sort, order, currentPage])

    return (
        < div style={{ width: '100%', height: '100%', backgroundColor: '' }}>
            <Box sx={{
                marginTop: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',

            }}>
                <Paper sx={{ p: 4, }} elevation={4}>
                    <br />

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={4} lg={8}>
                            <Typography variant="h3" textAlign='left' sx={{ fontWeight: 'bold' }}>
                                Stories
                            </Typography>
                        </Grid>

                        <Grid item xs={8} sm={4} md={2}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Sort *</InputLabel>
                                <Select
                                    labelId=''
                                    name='sort'
                                    id="sort"
                                    value={sort}
                                    label="sort"
                                    onChange={onSort}
                                >
                                    <MenuItem value={''}>-</MenuItem>
                                    <MenuItem value={'date'}>Sort by Date</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* <Grid item xs={12} sm={6} md={2}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 0, mb: -2 }}
                                color='secondary'
                                onClick={onChange}
                            >
                                Sort
                            </Button>
                        </Grid> */}
                        <Grid item xs={8} sm={4} md={2}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Order by *</InputLabel>
                                <Select
                                    labelId=''
                                    name='order'
                                    id="order"
                                    value={order}
                                    label="order by"
                                    onChange={onOrder}
                                >
                                    <MenuItem value={''}>-</MenuItem>
                                    <MenuItem value={'asc'}>Ascending</MenuItem>
                                    <MenuItem value={'desc'}>Descending</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* <Grid item xs={12} sm={6} md={1}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 0, mb: -2 }}
                                color='secondary'
                                onClick={onChange}
                            >
                                Order
                            </Button>
                        </Grid> */}
                    </Grid>

                </Paper>

            </Box >
            <Box sx={{ backgroundColor: 'floralwhite' }}>
                {story.length !== 0 ?
                    story.map((sto) => (
                        <Story key={sto._id} props={sto} />
                    ))
                    :
                    <>
                        <br />
                        <br />
                        <br />

                        <Typography variant="h5" textAlign='center' sx={{ fontWeight: 'bold' }}>
                            No Results Found
                        </Typography>
                    </>

                }
            </Box>
            {/* <Stack spacing={0}
                // sx={{ position: 'relative', ml: 72, mt: 5, mb: 2 }}
            > */}

            {/* <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" /> */}

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '14vh' }}>
                <Pagination className="mt-1 mb-0" count={parseInt(totalPages) || 1} page={parseInt(currentPage) || 1} onChange={handlePageChange} color="primary" />
            </div>
            {/* </Stack> */}
        </div>
    )
}

export default Stories