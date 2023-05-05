import React, { useState, useEffect } from 'react'
import Story from '../components/Story'
import Navbar from '../components/navbars/Navbar'

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

const Stories = () => {

    const [totalPages, setTotalPages] = useState('')
    const [currentPage, setCurrentPage] = useState('')
    const [story, setStory] = useState([])
    
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
        const getStories = async () => {
            try {
                const response = await axios.get("http://localhost:5000/stories", {
                    headers: {
                        'Authorization': `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFUlAiOiIyMjc0NyIsIm5hbWUiOiJKQU5FIERPRSIsInVzZXJSb2xlIjozLCJpYXQiOjE2ODMyODg2NjEsImV4cCI6MTY4MzI5MjI2MX0.iP9xCk0ZhyiPtiZAj97Ldfq4L2CWeRyHPGUPGSKTgbA"}`
                    }
                })

                setTotalPages(response.totalPages)
                setCurrentPage(response.currentPage)
                setStory(response.data.stories)
                //console.log(response.data)
            }
            catch (err) {
                //console.log(err.response.data.error)
                console.log(err.response.data.error)
            }
        }
        getStories()

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
                                Stories
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
                story.map((sto) => (
                    <Story props={sto}/>
                ))
            }
        </>
    )
}

export default Stories