import React from 'react'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Welcome from './Components/Welcome'




const App = () => {
    return (
        <div>
            
            <BrowserRouter>

                <Switch>
                    <Route path="/" component={Welcome} exact={true}/>   
                </Switch>
                
            </BrowserRouter>
        </div>
    )
}

export default App

