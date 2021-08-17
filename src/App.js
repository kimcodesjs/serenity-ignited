import React from 'react'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './Header'
import ContactMe from './ContactMe'
import AboutMe from './AboutMe'

import Landing from './Landing/Landing'
import Reiki from './Landing/Reiki'
import Access from './Landing/Access'

import Booking from './Booking/Booking'
import ModalSelect from './Booking/ModalSelect'
import TypeSelect from './Booking/TypeSelect'
import Scheduler from './Booking/Scheduler'
import PaymentForm from './Booking/PaymentForm'


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
                        <Booking>
                            <ModalSelect />
                            <TypeSelect />
                            <Scheduler />
                            <PaymentForm />
                        </Booking>
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

