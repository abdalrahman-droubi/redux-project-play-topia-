import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fetchUser, protectedData } from './actions/UserActions';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserNew } from './actions/UserActions';



// ------------------user -------------------------- //
import SignUp from './componentes/SignUpAndLogIn/SignUp'
import LogIn from './componentes/SignUpAndLogIn/Login';
import Navbar from './componentes/NavBar';
import Profile from './componentes/Profile';
import Home from './componentes/Home'
import Footer from './componentes/footer';
import Blog from './componentes/blog/Blog';
import BlogDetails from './componentes/blog/BlogDetails';
import Contact from './componentes/Contact';
import Games from './pages/Games';
import About from './componentes/About'

// ------------------dashboard -------------------------- //
// import ApproveTable from './componentes/dashboard/ApproveTable'
// import PendingPosts from './componentes/dashboard/PendingPosts'
// import UsersInfo from './componentes/dashboard/UserInfo'
// import MainDashboard from './componentes/dashboard/MainDashboard'
// import Sidebar from './componentes/dashboard/Sidebar'
// import ProfileMenu from './componentes/dashboard/NavDashboard'
import Sidebar from "./pages/dashboard/Sidebar";
import NavListMenuD from "./pages/dashboard/NavDashboard";
import MainDashboard from "./pages/dashboard/MainDashboard";
import EditAboutContact from "./pages/dashboard/EditAboutUs";
import UserInfo from "./componentes/dashboard/UserInfo"
import ApproveTable from "./componentes/dashboard/ApproveTable";
// import AdminInfo from "./components/dashboard/AdminInfo";
import Chat from "./pages/dashboard/Chat";
import PendingPosts from "./componentes/dashboard/PendingPosts";
// import PaymentsInfo from "./components/dashboard/Payment"

const App = () => {

  const [hideRouter1, setHideRouterUser] = useState(false);
  const [hideRouter2, setHideRouterAdmin] = useState(true);


  const dispatch = useDispatch();


  // useEffect(() => {
  //   if (localStorage.auth != null) {
  //     dispatch(fetchUserNew());
  //   }
  // }, [dispatch]);
  useEffect(() => {
    if (localStorage.auth != null) {
      dispatch(fetchUserNew());
      dispatch(fetchUserNew());
    }
  }, [dispatch]);


  useEffect(() => {
    if (localStorage.auth != null) {
      getUserInfo()
    }
  }, [dispatch]);

  const [userData, setUserData] = useState(null)
  const getUserInfo = async () => {
    try {
      const token = localStorage.getItem("auth");
      const response = await dispatch(fetchUserNew(token));
      setUserData(response.payload[0])
      let ManegeRouters = [];

      let role = response.payload[0].role
      if (role == 1) {
        ManegeRouters = [true, false, true]
      } else {
        ManegeRouters = [false, true, true]
      }
      setHideRouterUser(ManegeRouters[0]);
      setHideRouterAdmin(ManegeRouters[1]);
    } catch (error) {
      console.error('Failed to add Pokemon:', error);
    }
  }




  // ------------------user -------------------------- //
  const AppRouter1 = () => {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="SignUp" element={<SignUp />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="LogIn" element={<LogIn />} />
          <Route path="BlogDetails/:id" element={<BlogDetails />} />
          <Route path="Blog" element={<Blog />} />
          <Route path="Contact" element={<Contact />} />
          <Route path="Games" element={<Games />} />
          <Route path="About" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    );
  };





  //-----------------dashboard----------------------------------------//
  const AppRouter2 = () => {
    return (
      // <Router>
      //   <Routes>
      //   <Route path='PendingPosts' element={<PendingPosts/>}/>
      //   <Route path='UsersInfo' element={<UsersInfo/>}/>
      //   <Route path='ApproveTable' element={<ApproveTable/>}/>
      //   <Route index element={<MainDashboard/>}/>
      //   <Route path='Sidebar' element={<Sidebar/>}/>
      //   <Route path='ProfileMenu' element={<ProfileMenu/>}/>
      //   </Routes>
      // </Router>
      <Router>
        <Sidebar />
        <div style={{ width: "100%" }}>
          <NavListMenuD />
          <Routes>
            <Route index element={<MainDashboard />} />
            <Route path="ListUser" element={<UserInfo />} />
            <Route path=" " element={<EditAboutContact />} />
            <Route path="Chat" element={<Chat />} />
            {/* <Route path="UserProfile" element={<UserProfile />} /> */}
            <Route path="Comment" element={<ApproveTable />} />
            {/* <Route path="ListAdmin" element={<AdminInfo />} /> */}
            <Route path="AcceptTables" element={<PendingPosts/>} />
            {/* <Route path="PaymentsInfo" element={<PaymentsInfo />} /> */}
          </Routes>
        </div>
      </Router>
    );
  };












  return (


    <>
      {hideRouter1 ? null : (
        <>
          <AppRouter1 />
        </>
      )}

      {hideRouter2 ? null : (
        <>
          <div className="flex">
            <AppRouter2 />
          </div>
        </>
      )}


    </>


  );
};

export default App;
