import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
import Navigation from './Navigation'
import Authentication from './Authentication'
import AuthChange from './AuthChange'


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
        height: '100%',
        zIndex: '2',
        position: 'fixed',
        right: '-310px',
        opacity: 0,
        transition: 'right 1s, opacity 1s',
        boxShadow: '-5px 2px 5px #443356'
        
    },
    transitionEnter: {
        opacity: 0
    },
    transitionEnterActive: {
        opacity: 1,
        transition: 'opacity 1000ms'
    },
    transitionExit: {
        opacity: 1
    },
    transitionExitActive: {
        opacity: 0,
        transition: 'opacity 1000ms'
    }
    
    
})


const Menu = ({ setUser, user }) => {
    const classes = useStyles()

    const [menuDisplay, setMenuDisplay] = useState('nav-menu')
    const [menuToggle, setToggle] = useState(false)

    

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
                setMenuDisplay('nav-menu')
            }
        
        
    }
   
    return (
        
            <div>
                <div id='sidebar'>
                    <div className={classes.menuToggle} id='menu-toggle' >
                            <img src='/menu-icon.png' className={classes.menuIcon} id='menu-icon' onClick={toggleMenu} />
                    </div>

                    <div className={classes.menuDiv} id='menu'>
                        {menuDisplay === 'nav-menu' && <Navigation user={user ? true : false} setUser={setUser} display={menuDisplay} setDisplay={setMenuDisplay} toggleMenu={toggleMenu}/>}
                        {(menuDisplay === 'log-in' || menuDisplay === 'sign-up') && <Authentication display={menuDisplay} setDisplay={setMenuDisplay} setUser={setUser}/>}
                        {menuDisplay === 'auth-change' && <AuthChange user={user} display={menuDisplay} setDisplay={setMenuDisplay} />}
                    </div>
                </div>
            </div>
    )
}

export default Menu