import React from 'react'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './Components/Header'
import Welcome from './Components/Welcome'
import SoapShop from './Components/SoapShop/SoapShop'
import ReikiShop from './Components/ReikiShop/ReikiShop'





const App = () => {
    return (
        <div>
            
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route path="/" component={Welcome} exact={true}/>   
                    <Route path="/serenity-in-soap" component={SoapShop}/>
                    <Route path="/serenity-in-healing" component={ReikiShop}/>
                </Switch>
                
            </BrowserRouter>
        </div>
    )
}

export default App

