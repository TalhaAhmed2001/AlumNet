import React, { useState } from 'react'
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
import AdminNavbar from '../components/navbars/AdminNavbar';

const PromotingStudents = () => {

  let std = [
    123,
    456,
    789
  ];

  const [students, setStudents] = useState(std)

  const getStudents = () => {
    //setStudents(axios.get())
  }

  const promote = id => {
    //axios.promote(id)
    alert(id)
  }

  return (
    <>
      <AdminNavbar />
      <Container component="main" maxWidth="md">
        <br />
        <br />
        <br />
        <Table>
          <TableHead>
            <TableRow>
              {/* {columns.map((column) => (
            <TableCell key={column.id} >{column.label}</TableCell>
          ))} */}
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((row) => (
              <TableRow key={row}>
                <TableCell align="center">{row}</TableCell>
                <TableCell align="center">
                  <Button sx={{ ml: 2, mr: 2 }} variant="outlined" color="primary" onClick={() => promote(row)}>
                    Promote
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

export default PromotingStudents