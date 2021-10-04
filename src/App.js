import React from 'react'
import './Calendar.css'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './Header'
import ContactMe from './ContactMe'
import AboutMe from './AboutMe'

import Landing from './Landing/Landing'
import Reiki from './Landing/Reiki'
import Access from './Landing/Access'

import Booking from './Booking/Booking'

import Admin from './Admin/Admin'






const App = () => {


    return (
        <div>
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route path="/" exact={true}>
                        <Landing>
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

