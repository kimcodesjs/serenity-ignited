import React, { useState } from 'react'
import './Calendar.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createUseStyles } from 'react-jss'

import Header from './Header'
import SignInModal from './SignInModal'
import SignUpModal from './SignUpModal'
import ContactMe from './ContactMe'
import AboutMe from './AboutMe'

import Landing from './Landing/Landing'
import EnergyHealing from './Landing/EnergyHealing'
import Reiki from './Landing/Reiki'
import Access from './Landing/Access'

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

    const [displayModal, setModalDisplay] = useState(null)
    const [user, setUser] = useState(null)

    const classes = useStyles()
    return (
        <div className={classes.app}>
            <BrowserRouter>

                <Header setModalDisplay={setModalDisplay} />
                <SignUpModal display={displayModal === 'sign-up' ? true : false} setDisplay={setModalDisplay} setUser={setUser}/>
                <SignInModal display={displayModal === 'log-in' ? true : false} setDisplay={setModalDisplay} setUser={setUser} />   

                <Switch>
                    <Route path="/" exact={true}>
                        <Landing>
                            <EnergyHealing />
                            <Reiki />
                            <Access />
                        </Landing>    
                    </Route>   
                    <Route path='/booking'>
                        <Booking />
                    </Route>
                    <Route path="/contact-me" component={ContactMe}/>
                    <Route path="/about-me" component={AboutMe}/>
                    <Route path="/admin" component={Admin}/>
                </Switch>
                
            </BrowserRouter>
        </div>
    )
}

export default App

