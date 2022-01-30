import React, { useState } from 'react'
import './Calendar.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createUseStyles } from 'react-jss'

import ScrollToTop from './ScrollToTop'
import NavMenu from './NavMenu'
import ContactMe from './ContactMe'
import AboutMe from './AboutMe'

import Landing from './Landing/Landing'

import Booking from './Booking/Booking'

import Admin from './Admin/Admin'


const useStyles = createUseStyles({
    app: {
       // backgroundImage: 'url("angel wings chakras 1.jpg")',
        //backgroundSize: 'fill',
        //backgroundRepeat: 'no-repeat',
        //backgroundAttachment: 'fixed',
        fontFamily: "'Martel', serif"
    }
})




const App = () => {

    const [user, setUser] = useState(null)

    const classes = useStyles()
    return (
        <div className={classes.app}>
            <BrowserRouter>
                
                <ScrollToTop>
                    <NavMenu setUser={setUser} />

                    <Routes>
                        <Route path="/" element={<Landing />} /> 
                        <Route path='booking' element={<Booking />} />
                        <Route path="contact-me" element={<ContactMe />}/>
                        <Route path="about-me" element={<AboutMe />}/>
                        <Route path="admin" element={<Admin />}/>
                    </Routes>
                </ScrollToTop> 
            </BrowserRouter>
        </div>
    )
}

export default App

