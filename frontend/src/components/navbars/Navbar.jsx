import React from 'react'
import PropTypes from 'prop-types'
import AdminNavbar from './AdminNavbar';
import StudentNavbar from './StudentNavbar';
import AlumnusNavbar from './AlumnusNavbar';

const Navbar = props => {
    
    const {user_id} = props;

  return (
        <>
        {user_id === 1 ? <AdminNavbar/> : user_id === 2 ? <StudentNavbar/> : <AlumnusNavbar/>}
        </>
  )
}

Navbar.propTypes = {user_id: PropTypes.number}

export default Navbar