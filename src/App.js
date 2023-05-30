import React, { useState, Suspense, useEffect } from 'react';
import './Calendar.css';
import './alert.css';
import '@csstools/normalize.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import axios from 'axios';
import ScrollToTop from './ScrollToTop';
import Menu from './Menu/Menu';
import RequireAdmin from './Auth/RequireAdmin';
import { AuthProvider } from './Context/AuthContext';
import { EventProvider } from './Context/EventContext';
const Landing = React.lazy(() => import('./Landing/Landing'));
const Info = React.lazy(() => import('./Info/Info'));
const Booking = React.lazy(() => import('./Booking/Booking'));
const Events = React.lazy(() => import('./Events/Events'));
const EventPage = React.lazy(() => import('./Events/EventPage'));
const AllEvents = React.lazy(() => import('./Events/AllEvents'));
const PurchaseConfirmation = React.lazy(() =>
  import('./Events/PurchaseConfirmation')
);
const AboutMe = React.lazy(() => import('./AboutMe'));
const ContactMe = React.lazy(() => import('./ContactMe'));
const MySessions = React.lazy(() => import('./MySessions'));
const Admin = React.lazy(() => import('./Admin/Admin'));
const ResetPassword = React.lazy(() => import('./Auth/ResetPassword'));
const Authentication = React.lazy(() => import('./Auth/Authentication'));

const useStyles = createUseStyles({
  app: {
    fontFamily: "'Didact Gothic', sans-serif",
    height: '100%',
    width: '100%',
  },
});

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <BrowserRouter>
        <ScrollToTop>
          <AuthProvider>
            <EventProvider>
              <Menu />
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/info/*" element={<Info />} />
                  <Route path="booking" element={<Booking />} />

                  <Route path="events" element={<Events />}>
                    <Route path=":eventId" element={<EventPage />} />
                    <Route
                      path="events/purchase-confirmation"
                      element={<PurchaseConfirmation />}
                    />
                    <Route index element={<AllEvents />} />
                  </Route>
                  <Route path="contact-me" element={<ContactMe />} />
                  <Route path="about-me" element={<AboutMe />} />
                  <Route
                    path="admin"
                    element={
                      <RequireAdmin>
                        <Admin />
                      </RequireAdmin>
                    }
                  />
                  <Route path="/:userID/my-sessions" element={<MySessions />} />
                  <Route
                    path="/reset-password/:token"
                    element={<ResetPassword />}
                  />
                  <Route path="login" element={<Authentication />} />
                </Routes>
              </Suspense>
            </EventProvider>
          </AuthProvider>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default App;
