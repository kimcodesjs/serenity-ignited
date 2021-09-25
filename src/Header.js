import React from 'react'
import { Link } from 'react-router-dom'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    headerDiv: {
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '-webkit-box-shadow': '0px 5px 5px #b7d9e9',
        '-moz-box-shadow': '0px 1px 1px #b7d9e9',
        boxShadow :'0px 1px 1px' 
    },
    navLink: {
        textDecoration: 'none',
        padding: '10px'
    }
})

const Header = () => {
    const classes = useStyles()
    return (
        <div className={classes.headerDiv}>
            <Link to='/booking' className={classes.navLink}>Book a Session</Link>
            <Link to='/contact-me' className={classes.navLink}>Contact Me</Link>
            <Link to='/about-me' className={classes.navLink}>About Me</Link>
        </div>
    )
}

export default Header