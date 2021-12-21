import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { createUseStyles } from 'react-jss'
import { getAuth } from 'firebase/auth'
import SignInModal from './SignInModal'
import SignUpModal from './SignUpModal'

const useStyles = createUseStyles({
    
    menuToggle: {
        zIndex: '3',
        position: 'fixed',
        width: '100%',
        
    },
    menuIcon: {
        transitionProperty: 'opacity',
        transitionDuration: '2s',
        transitionDelay: '1s',
        float: 'right',
        width: '60px',
        height: 'auto',
        marginTop: '10px',
        marginRight: '10px',
        filter: 'drop-shadow(2px 2px 1px #443356)',
        cursor: 'pointer'
        
    },
    headerDiv: {
        
        display: 'inline-flex',
        flexDirection: 'column',
        backgroundImage: 'linear-gradient(to bottom, rgba(56, 17, 17, .92), rgba(60, 23, 89, .0)),url("bg-pastelcosmos.jpg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '300px',
        height: '100vh',
        zIndex: '2',
        position: 'fixed',
        right: '-310px',
        opacity: 0,
        transitionProperty: 'right, opacity',
        transitionDuration: '1s',
        transitionDelay: '0s',
        boxShadow: '-5px 2px 5px #443356'
        
    },
    headerLogo: {
        filter: 'drop-shadow(5px 5px 1px #443356)',
        width: '280px',
        height: 'auto',
        marginTop: '25px',
        right: '5px'
        
    },
    navMenu: {
        // height: '50px',
        display: 'inline-flex',
        flexDirection: 'column',
        // alignItems: 'center',
        // opacity: 0,
        // transitionProperty: 'opacity',
        // transitionDuration: '2s',
        // transitionDelay: '1'
        // display: 'none'
    },
    navLink: {
        textDecoration: 'none',
        padding: '10px',
        textAlign: 'center',
        color: 'black',
        fontSize: '20px',
        textShadow: '#381111 1px 0px 5px'
    },
    span: {
        padding: '10px',
        cursor: 'pointer',
        textAlign: 'center',
        fontSize: '20px',
        textShadow: '#381111 1px 0px 5px'
    }
})


const Header = ({ setUser }) => {
    const classes = useStyles()

    const [modalDisplay, setModalDisplay] = useState(null)
    const [menuToggle, setToggle] = useState(false)

    const animateHeader = () => {
        const header = document.getElementById('header')
        if (!menuToggle) {
            header.style.right = '0'
            header.style.opacity = 1
            setToggle(true)
        } else {
            header.style.right = '-310px'
            header.style.opacity = 0
            setToggle(false)
        }
    }

    const onClick = (e) => {
        e.preventDefault()
        if (e.target.innerHTML === 'Sign Up') {
            setModalDisplay('sign-up')
        } else if (e.target.innerHTML === 'Log In') {
            setModalDisplay('log-in')
        } else {
            const auth = getAuth()
            auth.signOut().then(() => {
                setUser(null)
            })
        }
    }
   
    return (
        <div>
            <div id='sidebar' onClick={animateHeader}>
                <div className={classes.menuToggle} id='menu-toggle'>
                        <img src='/menu-icon.png' className={classes.menuIcon} id='menu-icon'/>
                </div>

                <div className={classes.headerDiv} id='header' >
                        <Link to='/'>
                            <img src='/serenity-ignited-logo.png' className={classes.headerLogo} id='header-logo'/>
                                </Link>
                    <div className={classes.navMenu}>
                        <Link to='/booking' className={classes.navLink} id='book-a-session'>Book a Session</Link>
                        <Link to='/contact-me' className={classes.navLink} id='contact-me'>Contact Me</Link>
                        <Link to='/about-me' className={classes.navLink} id='about-me'>About Me</Link>
                        <span className={classes.span} onClick={onClick} id='log-in'>Log In</span>
                        <span className={classes.span} onClick={onClick} id='sign-up'>Sign Up</span>
                    </div>
                </div>
            </div>
            <SignUpModal display={modalDisplay === 'sign-up' ? true : false} setDisplay={setModalDisplay} setUser={setUser}/>
            <SignInModal display={modalDisplay === 'log-in' ? true : false} setDisplay={setModalDisplay} setUser={setUser} />   
        </div>
    )
}

export default Header