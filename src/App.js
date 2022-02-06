import React, { useState, Suspense } from 'react'
import './Calendar.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createUseStyles } from 'react-jss'
import ScrollToTop from './ScrollToTop'
import Menu from './Menu/Menu'
const Landing = React.lazy(() => import('./Landing/Landing'))
const Booking = React.lazy(() => import('./Booking/Booking'))
const AboutMe = React.lazy(() => import('./AboutMe'))
const ContactMe = React.lazy(() => import('./ContactMe'))
const MySessions  = React.lasy(() => import('./MySessions'))
const Admin = React.lazy(() => import('./Admin/Admin'))

const useStyles = createUseStyles({
    app: {
        fontFamily: "'Didact Gothic', sans-serif"
    }
})

const App = () => {

    const [user, setUser] = useState(null)
    // Some comment just for fun. :)
    const classes = useStyles()
    return (
        <div className={classes.app}>
            <BrowserRouter>
                
                <ScrollToTop>
                    <Menu user={user} setUser={setUser} />
                    <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<Landing />} /> 
                        <Route path='booking' element={<Booking />} />
                        <Route path="contact-me" element={<ContactMe />}/>
                        <Route path="about-me" element={<AboutMe />}/>
                        <Route path="admin" element={<Admin />}/>
                        <Route path='my-sessions' element={<MySessions />}/>
                    </Routes>
                    </Suspense>
                </ScrollToTop> 
            </BrowserRouter>
        </div>
    )
}

export default App

