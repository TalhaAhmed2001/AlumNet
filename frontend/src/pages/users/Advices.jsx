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

const Advices = () => {

    const token = localStorage.getItem('jwt');
    
    const [totalPages, setTotalPages] = useState('')
    const [currentPage, setCurrentPage] = useState('')
    const [advice, setAdvice] = useState([])

    const [query, setQuery] = useState({
        filter: '',
        search: ''
    })

    const { filter, search } = query

    const onChange = e => {
        setQuery((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSearch = e => {
        //axios.get(search)
    }

    const onFilter = e => {

    }

    useEffect(() => {
        const getAdvices = async () => {
            try {
                const response = await axios.get("http://localhost:5000/advices", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                setTotalPages(response.totalPages)
                setCurrentPage(response.currentPage)
                setAdvice(response.data.advices)
                //console.log(response.data)
            }
            catch (err) {
                //console.log(err.response.data.error)
                console.log(err.response.data.error)
            }
        }
        getAdvices()

    }, [filter,search])

    return (
        <>
            <Navbar user_id={3} />
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
                                Advices
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                name="search"
                                required
                                fullWidth
                                id="search"
                                label=""
                                onChange={onChange}
                                value={search}
                                placeholder='Enter Search thing here...'
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 0, mb: -2 }}
                                color='secondary'
                                onClick={onSearch}
                            >
                                Search
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Filter *</InputLabel>
                                <Select
                                    labelId='demo-simple-select-label'
                                    name='filter'
                                    id="filter"
                                    value={filter}
                                    label="filter"
                                    onChange={onChange}
                                >
                                    <MenuItem value={'General'}>General</MenuItem>
                                    <MenuItem value={'BSCS'}>BSCS</MenuItem>
                                    <MenuItem value={'BBA'}>BBA</MenuItem>
                                    <MenuItem value={'SSLA'}>SSLA</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 0, mb: -2 }}
                                color='secondary'
                                onClick={onFilter}
                            >
                                Filter
                            </Button>
                        </Grid>
                    </Grid>

                </Paper>

            </Box>
            {
                advice.map((adv) => (
                    <Advice key={adv._id} props={adv} />
                ))
            }
        </>
    )
}

export default Advices