import Login from './pages/loggedout/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/loggedout/Register';

import Navbar from './components/navbars/Navbar';
import MyProfile from './pages/users/MyProfile';
import Home from './pages/users/Home';
import Create from './pages/users/Create';
import PendingProfiles from './pages/admin/PendingProfiles';
import PromotingStudents from './pages/admin/PromotingStudents';
import Eradication from './pages/admin/Eradication';
import Stories from './pages/users/Stories';
import Advices from './pages/users/Advices';
import Alumni from './pages/users/Alumni';
import { useEffect, useState } from 'react';
import AdminNavbar from './components/navbars/AdminNavbar';
import StudentNavbar from './components/navbars/StudentNavbar';
import AlumnusNavbar from './components/navbars/AlumnusNavbar';
import UpdateStudentProfile from './components/updates/UpdateStudentProfile';
import UpdateAlumnusProfile from './components/updates/UpdateAlumnusProfile';
import UpdateStudent from './components/UpdateStudent';
import UpdateAlumnus from './components/UpdateAlumnus';

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userId, setUserId] = useState(localStorage.getItem("user_role"))
    const [token, setToken] = useState(localStorage.getItem("jwt"))

    // useEffect(() => {
    //     const token = localStorage.getItem("jwt");
    //     const user_id = localStorage.getItem("user_role")

    //     if (token) {
    //         setIsLoggedIn(true)
    //         setUserId(user_id)
    //     }
    // }, [])

    return (
        <div className="container">
            <>
                {
                    !token ?
                        <Router>
                            <Routes>
                                <Route path='/' element={<Login />} />
                                <Route path='/login' element={<Login />} />
                                <Route path='/register' element={<Register />} />
                            </Routes>
                        </Router>
                        : userId === '1' ?
                            <Router>
                                <AdminNavbar />
                                <Routes>
                                    <Route path='/' element={<PendingProfiles />} />
                                    <Route path='/pendingprofiles' element={<PendingProfiles />} />
                                    <Route path='/promotingstudents' element={<PromotingStudents />} />
                                    <Route path='/eradication' element={<Eradication />} />
                                </Routes>
                            </Router>
                            : userId === '2' ?
                                <Router>
                                    <StudentNavbar />
                                    <Routes>
                                        <Route path='/' element={<><Home /></>} />
                                        <Route path='/myprofile' element={<UpdateStudent />} />
                                        <Route path='/stories' element={<Stories />} />
                                        <Route path='/advices' element={<Advices />} />
                                        <Route path='/alumni' element={<Alumni />} />
                                    </Routes>
                                </Router>
                                : userId === '3' ?
                                    <Router>
                                        <AlumnusNavbar />
                                        <Routes>
                                            <Route path='/' element={<><Home /></>} />
                                            <Route path='/myprofile' element={<UpdateAlumnus />} />
                                            <Route path='/create' element={<Create />} />
                                            <Route path='/stories' element={<Stories />} />
                                            <Route path='/advices' element={<Advices />} />
                                            <Route path='/alumni' element={<Alumni />} />
                                        </Routes>
                                    </Router>
                                    : <>hello</>
                }

            </>
        </div>
    );

}

export default App;
