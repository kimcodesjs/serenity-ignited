import React from 'react'
import { createUseStyles, withTheme } from 'react-jss'
import EnergyHealing from './EnergyHealing'
import Reiki from './Reiki'
import Access from './Access'

const useStyles = createUseStyles({

    header: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        minHeight: '700px',
        width: '100%',
        backgroundImage: 'linear-gradient(to bottom, rgba(56, 17, 17, .72), rgba(60, 23, 89, .0))',
        zIndex: 3,
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        objectFit: 'cover',
        zIndex: '-2'
    },
    foreground: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        objectFit: 'cover',
        zIndex: '-1',
        opacity: '.6',
        
    },
    greeting: {
        fontFamily: "'Clicker Script', cursive",
        fontStyle: 'italic',
        fontSize: '50px',
        fontWeight: 'bold',
        color: 'white',
        textShadow: '#381111 5px 0px 5px',
        textAlign: 'center',
        width: '50%',
        margin: 0,
        paddingBottom: '100px',
        filter: 'drop-shadow(10px 10px 1px #443356)',
        zIndex: 0,
        "@media (max-width: 900px)": {
            width: '75%'
        },
        "@media (max-width: 750px)": {
            fontSize: '35px'
        },
        "@media (max-width: 400px)": {
            fontSize: '25px',
            paddingBottom: '100px'
        }
    },
    logo: {
        width: '80%',
        maxWidth: '730px',
        height: 'auto',
        paddingRight: '50px',
        filter: 'drop-shadow(10px 10px 1px #443356)',
        zIndex: 0,
        "@media (max-width: 400px)": {
            width: '90%',
            height: 'auto'
        }
    }
})

const Landing = () => {
    const classes = useStyles()
    window.addEventListener('scroll', (e) => {
        const foreground = document.getElementById('foreground')
        const background = document.getElementById('background')
        const logo = document.getElementById('logo')
        const greeting = document.getElementById('greeting')
        let value = window.scrollY

        background.style.top = value * .25 + 'px'
        foreground.style.top = value * .5 + 'px'
        logo.style.filter = `drop-shadow(10px ${10 - (value*.03)}px 1px #443356)`
        greeting.style.filter = `drop-shadow(10px ${10 - value*.03}px 1px #443356)`
    })
    return (
        <>
            <div className={classes.header}>
                <img src='/4.png' className={classes.background} id='background'/>
                <img src='/1.png' className={classes.foreground} id='foreground'/>
                <img src='serenity-ignited-logo.png' width='50%' height='auto' className={classes.logo} id='logo'/>
                <p className={classes.greeting} id='greeting'>
                    Let us walk with you on your journey to find peace, happiness, and serenity.
                </p>
            </div>
            <EnergyHealing />
            <Reiki />
            <Access />
        </>
    )

}

export default Landing