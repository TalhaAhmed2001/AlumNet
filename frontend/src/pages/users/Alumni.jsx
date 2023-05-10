import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbars/Navbar'
import Alumnus from '../../components/Alumnus'

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

const Alumni = () => {

    const token = localStorage.getItem('jwt');

    const [totalPages, setTotalPages] = useState('')
    const [currentPage, setCurrentPage] = useState('')
    const [alumnus, setAlumnus] = useState([])

    const [query, setQuery] = useState({
        filter: '',
        search: '',
        sort: ''
    })

    const [filter, setFilter] = useState('')
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')

    const onChange = () => {
        setQuery(() => ({
            filter: { filter },
            sort: { sort },
            search: { search }
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

    const onSearch = e => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        const getAlumni = async () => {
            try {
                const response = await axios.get("http://localhost:5000/alumni", {
                    params: {
                        'category': `${filter}`,
                        'sort': `${sort}`,
                        'page': `${currentPage}`,
                        // 'search': `${search}`
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                setTotalPages(response.data.totalPages)
                setCurrentPage(response.data.currentPage)
                setAlumnus(response.data.alumni)
                console.log('totalpages = ' + response.data.totalPages + 'currentpage = ' + response.data.currentPage)
            }
            catch (err) {
                console.log(err.response.data.error)
            }
        }
        getAlumni()

    }, [query, currentPage, filter, sort])

    return (
        <>
            <Box sx={{
                marginTop: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
            }}>
                <Paper sx={{ p: 4, }} elevation={4}>
                    <br />

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={3} lg={2}>
                            <Typography variant="h3" textAlign='left' sx={{ fontWeight: 'bold' }}>
                                Alumni
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6} lg={3}>
                            <TextField
                                name="search"
                                required
                                fullWidth
                                id="search"
                                label=""
                                onChange={onSearch}
                                value={search}
                                placeholder='Search Alumni by full name...'
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2} lg={4}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 0, mb: -2 }}
                                color='secondary'
                                onClick={onChange}
                            >
                                Search
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={2}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">filter by degree</InputLabel>
                                <Select
                                    labelId='demo-simple-select-label'
                                    name='filter'
                                    id="filter"
                                    value={filter}
                                    label="filter by degree"
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
                        {/* <Grid item xs={12} sm={6} md={2} lg={1}>
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
                        <Grid item xs={12} sm={6} lg={2}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Sort by Graduation</InputLabel>
                                <Select
                                    labelId='demo-simple-select-label'
                                    name='sort'
                                    id="sort"
                                    value={sort}
                                    label="Sort by Graduation"
                                    onChange={onSort}
                                >
                                    <MenuItem value={''}>-</MenuItem>
                                    <MenuItem value={'grad asc'}>Ascending</MenuItem>
                                    <MenuItem value={'grad desc'}>Dscending</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* <Grid item xs={12} sm={6} md={2} lg={1}>
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
                    </Grid>

                </Paper>

            </Box>
            {
                alumnus.map((profile) => (
                    <Alumnus key={profile.id} props={profile} />
                ))
            }
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '14vh' }}>
                <Pagination className="mt-1 mb-1" count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
            </div>
        </>
    )
}

export default Alumni