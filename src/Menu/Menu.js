import React, { useState, useEffect } from 'react'
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
        backgroundImage: 'linear-gradient(to bottom, rgba(56, 17, 17, .92), rgba(60, 23, 89, .0)),url("/bg-pastelcosmos.jpg")',
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
    authDiv: {
        marginTop: '100px',
        marginLeft: '50px',
        marginRight: 'auto',
    },
    button: {
        marginBottom: '10px',
        padding: '0',
        border: 'none',
        textAlign: 'center',
        userSelect: 'none',
        cursor: 'pointer',
        background: 'transparent',
        textShadow: '#e5d7d7 1px 0px 5px',
        filter: 'drop-shadow(2px 2px 1px #443356)',
        borderRadius: '10px',
        fontWeight: 'bold',
        fontFamily: 'inherit'
    }
})

const Menu = ({ setUser, user }) => {
    const classes = useStyles()

    const [menuDisplay, setMenuDisplay] = useState('nav-menu')
    const [menuToggle, setToggle] = useState(false)

    useEffect(() => {
        if (menuDisplay === 'log-in' || menuDisplay === 'sign-up') {
            setMenuDisplay('auth-change')
        }
    }, [user])

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
                        {(menuDisplay === 'log-in' || menuDisplay === 'sign-up') && 
                            <>
                                
                                <div className={classes.authDiv}>
                                    <Authentication authFlow={menuDisplay} />
                                </div>
                                <button className={classes.button} onClick={(e) => {
                                        e.preventDefault()
                                        setMenuDisplay('nav-menu')
                                    }}>Return to Menu</button>
                            </>
                        }
                        {menuDisplay === 'auth-change' && <AuthChange user={user} display={menuDisplay} setDisplay={setMenuDisplay} />}
                    </div>
                </div>
            </div>
    )
}

export default Menu