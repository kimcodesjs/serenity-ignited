import React, { useState, Suspense, useEffect } from 'react';
import './Calendar.css';
import '@csstools/normalize.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import axios from 'axios';
import ScrollToTop from './ScrollToTop';
import Menu from './Menu/Menu';
const Landing = React.lazy(() => import('./Landing/Landing'));
const Info = React.lazy(() => import('./Info/Info'));
const Booking = React.lazy(() => import('./Booking/Booking'));
const AboutMe = React.lazy(() => import('./AboutMe'));
const ContactMe = React.lazy(() => import('./ContactMe'));
const MySessions = React.lazy(() => import('./MySessions'));
const Admin = React.lazy(() => import('./Admin/Admin'));
const ResetPassword = React.lazy(() => import('./ResetPassword'));

const useStyles = createUseStyles({
  app: {
    fontFamily: "'Didact Gothic', sans-serif",
    height: '100%',
    width: '100%',
  },
});

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getAuthStatus = async () => {
      try {
        await axios({
          method: 'GET',
          url: `http://127.0.0.1:3000/api/v1/users/get-auth-status`,
          withCredentials: true,
        }).then((res) => {
          if (res.status === 200) {
            setUser(res.data.data);
          }
        });
      } catch (err) {
        console.log(err);
      }
    };
    getAuthStatus();
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.app}>
      <BrowserRouter>
        <ScrollToTop>
          <Menu user={user} setUser={setUser} />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/info/*" element={<Info />} />
              <Route
                path="booking"
                element={<Booking user={user} setUser={setUser} />}
              />
              <Route path="contact-me" element={<ContactMe />} />
              <Route path="about-me" element={<AboutMe />} />
              <Route path="admin" element={<Admin />} />
              <Route path="/:userID/my-sessions" element={<MySessions />} />
              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              />
            </Routes>
          </Suspense>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default App;
