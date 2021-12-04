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
        "@media (max-width: 790px)": {
            flexDirection: 'column',
            backgroundImage: 'linear-gradient(to bottom, rgba(56, 17, 17, .92), rgba(60, 23, 89, .0)),url("angel wings chakras 1.jpg")',

        }
        
    },
    greeting: {
        fontSize: '35px',
        textAlign: 'center',
        width: '40%',
        marginLeft: '80px',
        marginRight: '40px',
        filter: 'drop-shadow(5px 5px 1px #443356)',
        "@media (max-width: 1180px)": {
            fontSize: '24px'
        },
        "@media (max-width: 790px)": {
            flexDirection: 'column',
            margin: 0,
            width: '75%'
        }
    },
    logo: {
        width: '50%',
        height: 'auto',
        filter: 'drop-shadow(7px 7px 1px #443356)',
        "@media (max-width: 790px)": {
            marginRight: '50px',
            width: '60%',
            height: 'auto'
        },
        "@media (max-width: 565px)": {
            width: '80%',
            height: 'auto'
        }
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