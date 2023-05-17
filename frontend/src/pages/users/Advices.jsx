import React, { useEffect, useState } from 'react'
import Advice from '../../components/Advice'
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

const Advices = () => {

    const token = localStorage.getItem('jwt');

    const [totalPages, setTotalPages] = useState('')
    const [currentPage, setCurrentPage] = useState('')
    const [advice, setAdvice] = useState([])
    const [likedAdvices, setLikedAdvices] = useState([])

    const [query, setQuery] = useState({
        filter: '',
        sort: '',
        order: ''
    })

    const [filter, setFilter] = useState('')
    const [sort, setSort] = useState('')
    const [order, setOrder] = useState('')

    const onChange = () => {
        setQuery(() => ({
            filter: { filter },
            sort: { sort },
            order: { order }
        }))
    }


    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const onFilter = e => {
        setFilter(e.target.value)
    }

    const onSort = e => {
        setSort(e.target.value)
    }

    const onOrder = e => {
        setOrder(e.target.value)
    }

    useEffect(() => {
        const getLikedAdvices = async () => {
            try {
                const res = await axios.get("http://localhost:5000/advices/likedadvices", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                const list = res.data
                //console.log(res.data)
                console.log(list)


                let liked_list = advice.map((adv) => {
                    //console.log("mapp")
                    if (list.includes(adv._id)) {
                        //console.log('true')
                        return (true);
                    }
                    else {
                        //console.log('false')
                        return (false);
                    }
                })
                //console.log(liked_list)
                //likedRef.current = liked_list;
                setLikedAdvices(liked_list)

                //console.log(sto)
                //setStory(sto)
                //console.log(story)
                console.log("in liked advices")
            }
            catch (err) {
                console.log(err.res.data.error)
            }
        }
        getLikedAdvices();

    }, [advice])

    useEffect(() => {

        const getAdvices = async () => {

            setLikedAdvices([])
            try {
                const response = await axios.get("http://localhost:5000/advices", {
                    params: {
                        'category': `${filter}`,
                        'sort': `${sort}`,
                        'page': `${currentPage}`,
                        'order': `${order}`
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                setTotalPages(response.data.totalPages)
                //setCurrentPage(response.data.currentPage)
                let advic = response.data.advices
                advic.liked = response.data.liked
                setAdvice(response.data.advices)
            }
            catch (err) {
                //console.log(err.response.data.error)
                console.log(err.response.data.error)
            }
        }
        getAdvices()

    }, [token, filter, sort, order, query, currentPage])

    return (
        <>
            <Box sx={{
                marginTop: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
            }}>
                <Paper sx={{
                    p: 4,
                }} elevation={4}>
                    <br />

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Typography variant="h3" textAlign='left' sx={{ fontWeight: 'bold', fontFamily:'sans' }}>
                                Alumni Advices
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
                                    <MenuItem value={'popularity'}>Sort by Popularity</MenuItem>
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
                        <Grid item xs={8} sm={4} md={2}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Filter *</InputLabel>
                                <Select
                                    labelId='demo-simple-select-label'
                                    name='filter'
                                    id="filter"
                                    value={filter}
                                    label="filter"
                                    onChange={onFilter}
                                >
                                    <MenuItem value={''}>-</MenuItem>
                                    <MenuItem value={'General'}>General</MenuItem>
                                    <MenuItem value={'BSCS'}>BSCS</MenuItem>
                                    <MenuItem value={'BBA'}>BBA</MenuItem>
                                    <MenuItem value={'SSLA'}>SSLA</MenuItem>
                                    <MenuItem value={'BSAF'}>BSAF</MenuItem>
                                    <MenuItem value={'BSS'}>BSS</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* <Grid item xs={12} sm={2}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 0, mb: -2 }}
                                color='secondary'
                                onClick={onChange}
                            >
                                Filter
                            </Button>
                        </Grid> */}
                    </Grid>

                </Paper>

            </Box>
            <Box sx={{ backgroundColor: 'floralwhite' }}>
                {likedAdvices.length !== 0 ?
                    advice.length !== 0 ?
                        advice.map((adv, index) => {
                            let obj = adv;
                            obj.liked = likedAdvices[index];
                            return (<Advice key={obj._id} props={obj} />)
                        })
                        :
                        <>
                            <br />
                            <br />
                            <br />

                            <Typography variant="h5" textAlign='center' sx={{ fontWeight: 'bold' }}>
                                No Results Found
                            </Typography>
                        </>
                    :
                    <Typography variant="h5" textAlign='center' sx={{ fontWeight: 'bold' }}>
                        Loading
                    </Typography>
                }
            </Box>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '14vh' }}>
                <Pagination className="mt-1 mb-1" count={parseInt(totalPages) || 1} page={parseInt(currentPage) || 1} onChange={handlePageChange} color="primary" />
            </div>
        </>
    )
}

export default Advices