import React, { useState } from 'react'
import Dashboard from './Dashboard'
import Login from './Login'

const Admin = () => {

    const [authenticated, isAuthenticated] = useState(true) // this may end up being implemented using firebase auth

    return (
        
        <div>
            {authenticated ? <Dashboard /> : <Login updateAuth={isAuthenticated}/>}
        </div>
    )
}

export default Admin