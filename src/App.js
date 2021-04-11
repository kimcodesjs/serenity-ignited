import React from 'react'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './Components/Header'
import Welcome from './Components/Welcome'
import SoapShop from './Components/SoapShop/SoapShop'
import ReikiShop from './Components/ReikiShop/ReikiShop'
import Booking from './Components/ReikiShop/Booking'
import ContactMe from './Components/ContactMe'
import AboutMe from './Components/AboutMe'
import Admin from './Components/Admin/Admin'





const App = () => {
    return (
        <div>
            
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route path="/" component={Welcome} exact={true}/>   
                    <Route path="/serenity-in-soap" component={SoapShop}/>
                    <Route path='/serenity-in-healing/booking' component={Booking} />
                    <Route path="/serenity-in-healing" component={ReikiShop}/>
                    <Route path="/contact-me" component={ContactMe}/>
                    <Route path="/about-me" component={AboutMe}/>
                    <Route path="/admin" component={Admin}/>
                </Switch>
                
            </BrowserRouter>
        </div>
    )
}

export default App

