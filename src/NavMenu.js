import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { createUseStyles } from 'react-jss'
import { getAuth } from 'firebase/auth'
import Authentication from './Authentication'

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
    menuDiv: {
        
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
        transition: 'right 1s, opacity 1s',
        boxShadow: '-5px 2px 5px #443356'
        
    },
    menuLogo: {
        filter: 'drop-shadow(5px 5px 1px #443356)',
        width: '280px',
        height: 'auto',
        marginTop: '25px',
        right: '5px'
        
    },
    navMenu: {
        height: '600px',
        display: 'inline-flex',
        flexDirection: 'column',
        // alignItems: 'center',
        opacity: 1,
        transition: 'opacity .5s, height 1s',
        overflow: 'hidden'
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
        textShadow: '#381111 1px 0px 5px',
        '-webkit-user-select': 'none', /* Safari */        
        '-moz-user-select': 'none', /* Firefox */
        '-ms-user-select': 'none', /* IE10+/Edge */
        userSelect: 'none' 
    }
})


const NavMenu = ({ setUser }) => {
    const classes = useStyles()

    const [navDisplay, setNavDisplay] = useState('nav-menu')
    const [menuToggle, setToggle] = useState(false)

    useEffect(() => {
        animateNavMenu()
    },[navDisplay])

    const toggleMenu = () => {
        const menu = document.getElementById('menu')
        
            if (!menuToggle) {
                menu.style.right = '0'
                menu.style.opacity = 1
                setToggle(true)
            } else {
                menu.style.right = '-310px'
                menu.style.opacity = 0
                setToggle(false)
            }
        
        
    }

    const handleLinkClicks = (e) => {

        if (e.target.id === 'log-in' || e.target.id === 'sign-up') {
            animateNavMenu()
            setNavDisplay(e.target.id)
        } else {
            toggleMenu()
        }
    }
    /*
   

    */
    const animateNavMenu = () => {
        const navMenu = document.getElementById('nav-menu')
        if (navDisplay === 'nav-menu') {
            navMenu.style.height = '600px'
            navMenu.style.opacity = '1'
        } else {
            navMenu.style.height = '0'
            navMenu.style.opacity = '0'
        }
        
    }
    const onClick = (e) => {
        e.preventDefault()
        if (e.target.innerHTML === 'Sign Up') {
            setNavDisplay('sign-up')
        } else if (e.target.innerHTML === 'Log In') {
            setNavDisplay('log-in')
        } else {
            const auth = getAuth()
            auth.signOut().then(() => {
                setUser(null)
            })
        }
    }
   
    return (
        <div>
            <div id='sidebar'>
                <div className={classes.menuToggle} id='menu-toggle' >
                        <img src='/menu-icon.png' className={classes.menuIcon} id='menu-icon' onClick={toggleMenu} />
                </div>

                <div className={classes.menuDiv} id='menu' >
                    <div id='nav-menu' className={classes.navMenu} onClick={(e) => {e.preventDefault(); handleLinkClicks(e)}}>
                        <Link to='/'>
                            <img src='/serenity-ignited-logo.png' className={classes.menuLogo} id='menu-logo' onClick={toggleMenu}/>
                        </Link>
                        <Link to='/booking' className={classes.navLink} id='book-a-session'>Book a Session</Link>
                        <Link to='/contact-me' className={classes.navLink} id='contact-me'>Contact Me</Link>
                        <Link to='/about-me' className={classes.navLink} id='about-me'>About Me</Link>
                        <span className={classes.span} onClick={onClick} id='log-in'>Log In</span>
                        <span className={classes.span} onClick={onClick} id='sign-up'>Sign Up</span> 
                    </div>
                    <Authentication display={navDisplay} setDisplay={setNavDisplay} setUser={setUser}/>
                </div>
            </div>
               
        </div>
    )
}

export default NavMenu