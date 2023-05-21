import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AdminNavbar from '../../components/navbars/AdminNavbar';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Eradication = () => {

  const token = localStorage.getItem("jwt");

  const [profiles, setProfiles] = useState([])

  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('success')
  const [text, setText] = useState('')

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    const getApproved = async () => {
      try {
        const response = await axios.get("http://localhost:5000/approvedprofiles", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        setProfiles(response.data)

      }
      catch (err) {
        console.log(err.response.data.error)
      }
    }
    getApproved()
  }, [open])

  const eradicate = async (id, user_role) => {

    const user = user_role;
    console.log(user)

    try {

      const response = await axios.delete("http://localhost:5000/delete/" + `${user}` + "/" + id,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

      if (user === 'alumnus') {

        const resp = await axios.delete("http://localhost:5000/delete/stories/" + `${id}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })

        const res = await axios.delete("http://localhost:5000/delete/advices/" + `${id}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })

      }

      setText(response.data.message)
      setSeverity('success')
      setOpen(true)
    }
    catch (err) {
      console.log(err.response.data)
      setText(err.response.data)
      setSeverity('error')
      setOpen(true)
    }

  }

  return (
    <>
      <br />
      <br />
      <Container component="main" maxWidth="lg">
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={open}
          onClose={handleClose}
          autoHideDuration={5000}>
          <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {text}
          </Alert>

        </Snackbar>
        <br />
        <br />
        <br />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="right">User Role</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {profiles.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="right">{row.user_role}</TableCell>
                <TableCell align="center">
                  <Button sx={{ ml: 2, mr: 2 }} variant="outlined" color="error" onClick={() => eradicate(row.id, row.user_role)}>
                    Eradicate
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </Container>
    </>
  )
}

export default Eradication