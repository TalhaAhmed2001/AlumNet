import React, { useState, useEffect } from 'react'
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
import AdminNavbar from '../components/navbars/AdminNavbar';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const PendingProfiles = () => {

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFUlAiOiIxMDAxIiwibmFtZSI6InN5c2FkbWluICIsInVzZXJSb2xlIjoxLCJpYXQiOjE2ODMyOTM3MDgsImV4cCI6MTY4MzI5NzMwOH0.lsYoY_-kj4Uf8SoSscZlcePmWjgLQjmzPqUPS3VEB0I"
  const [profiles, setProfiles] = useState([])

  const approve = async (id) => {

    try {

      const response = await axios.patch("http://localhost:5000/approve/" + id, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })

      setText(response.data.message)
      setSeverity('success')
      setOpen(true)
    }
    catch (err) {
      console.log(err.response.data)
      setText(err.response.data.message)
      setSeverity('error')
      setOpen(true)
    }

  }

  const decline = async (id) => {

    try {

      const response = await axios.delete("http://localhost:5000/decline/" + id, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })

      setText(response.data.message)
      setSeverity('error')
      setOpen(true)
    }
    catch (err) {
      console.log(err.response.data)
      setText(err.response.data.message)
      setSeverity('error')
      setOpen(true)
    }

  }

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
    const getPending = async () => {
      try {
        const response = await axios.get("http://localhost:5000/pendingprofiles", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        setProfiles(response.data)

      }
      catch (err) {
        console.log(err.response.data.error)
        setText(err.response.data.error)
        setSeverity('error')
        setOpen(true)
      }
    }
    getPending()
  }, [open])

  return (
    <>
      <AdminNavbar />
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
                  <Button sx={{ ml: 2, mr: 2 }} variant="outlined" color="primary" onClick={() => approve(row.id)}>
                    Approve
                  </Button>
                  <Button sx={{ ml: 2, mr: 2 }} variant="outlined" color='error' onClick={() => decline(row.id)}>
                    Decline
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </Container>
    </>
  );
}

export default PendingProfiles