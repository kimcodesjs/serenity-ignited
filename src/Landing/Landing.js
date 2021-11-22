import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    landing: {
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundImage: 'linear-gradient(to right, rgba(56, 17, 17, .92), rgba(60, 23, 89, .0)),url("angel wings chakras 1.jpg")',
        backgroundAttachment: 'fixed',
        
    },
    greeting: {
        fontSize: '35px',
        textAlign: 'center',
        width: '40%',
        marginLeft: '80px',
        marginRight: '40px'
    }
})

const Landing = ({ children }) => {
    const classes = useStyles()
    return (
        <>
        <div className={classes.landing}>
            <img src='serenity-ignited-logo.png' width='50%' height='auto' className={classes.logo}/>
            <p className={classes.greeting}>
                Let us walk with you on your journey to find peace, happiness, and serenity.
            </p>
        </div>
            {children}
        </>
    )

}

export default Landing