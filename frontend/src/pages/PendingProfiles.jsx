import React, { useState } from 'react'
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

const PendingProfiles = () => {

  let pending = [
    { id: '123', user_role: 'alumnus' },
    { id: '456', user_role: 'student' },
    { id: '789', user_role: 'alumnus' }
  ]

  const [profiles, setProfiles] = useState(pending)

  const approve = id => {
    alert('approved ' + id)
  }

  const decline = id => {
    alert('declined ' + id)
  }

  const getPending = () => {
    //axios.get()
  }

  return (
    <>
      <AdminNavbar />
      <Container component="main" maxWidth="lg">
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
            {pending.map((row) => (
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