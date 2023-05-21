import Login from './pages/loggedout/Login';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Register from './pages/loggedout/Register';

import Home from './pages/users/Home';
import Create from './pages/users/Create';
import PendingProfiles from './pages/admin/PendingProfiles';
import PromotingStudents from './pages/admin/PromotingStudents';
import Eradication from './pages/admin/Eradication';
import Stories from './pages/users/Stories';
import Advices from './pages/users/Advices';
import Alumni from './pages/users/Alumni';
// import { useState } from 'react';
import AdminNavbar from './components/navbars/AdminNavbar';
import StudentNavbar from './components/navbars/StudentNavbar';
import AlumnusNavbar from './components/navbars/AlumnusNavbar';
import UpdateStudent from './components/UpdateStudent';
import UpdateAlumnus from './components/UpdateAlumnus';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import Alumnus from './pages/users/AlumnusPage';
import AdvicePage from './pages/users/AdvicePage';
import StoryPage from './pages/users/StoryPage';
import Navbar from './components/navbars/Navbar';

function App() {

    // const [isLoggedIn, setIsLoggedIn] = useState(false)
    // const [userId, setUserId] = useState(localStorage.getItem("user_role"))
    // const [token, setToken] = useState(localStorage.getItem("jwt"))
    // const location = useLocation();

    const token = localStorage.getItem("jwt");
    const userId = localStorage.getItem("user_role");
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
                            <Navbar/>
                            <Routes>
                                <Route path='/' element={<Login />} />
                                <Route path='/login' element={<Login />} />
                                <Route path='/register' element={<Register />} />
                                <Route path='*' element={<NotFound />} />
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
                                    <Route path='*' element={<NotFound />} />
                                </Routes>
                            </Router>
                            : userId === '2' ?
                                <Router>
                                    <StudentNavbar />
                                    <Routes>
                                        <Route path='/' element={<><Home /></>} />
                                        <Route path='/myprofile' element={<UpdateStudent />} />
                                        <Route path='/stories' element={<Stories />} />
                                        <Route path='/stories/:ERP/:_id' element={<StoryPage />} />
                                        <Route path='/advices' element={<Advices />} />
                                        <Route path='/advices/:ERP/:_id' element={<AdvicePage />} />
                                        <Route path='/alumni' element={<Alumni />} />
                                        <Route path='/alumni/:id' element={<Alumnus />} />
                                        <Route path='*' element={<><NotFound /></>} />
                                    </Routes>
                                    <Footer />
                                </Router>
                                : userId === '3' ?
                                    <Router>
                                        <AlumnusNavbar />
                                        <Routes>
                                            <Route path='/' element={<><Home /></>} />
                                            <Route path='/create' element={<Create />} />
                                            <Route path='/stories' element={<Stories />} />
                                            <Route path='/myprofile' element={<UpdateAlumnus hideFooter/>} />
                                            <Route path='/stories/:ERP/:_id' element={<StoryPage />} />
                                            <Route path='/advices' element={<Advices />} />
                                            <Route path='/advices/:ERP/:_id' element={<AdvicePage />} />
                                            <Route path='/alumni' element={<Alumni />} />
                                            <Route path='/alumni/:id' element={<Alumnus />} />
                                            <Route path='*' element={<NotFound />} />
                                        </Routes>
                                        <Footer/>
                                    </Router>
                                    : <>hello</>
                }

            </>
        </div>
    );

}

export default App;
