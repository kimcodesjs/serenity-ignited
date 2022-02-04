import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({

})

const AuthChange = ({ user }) => {
    const classes = useStyles()


    return (
        <div className={classes.authMessage}>
            {user ? <h2>Welcome, User</h2> : <h2>Until next time...</h2>}
        </div>
    )
}

export default AuthChange