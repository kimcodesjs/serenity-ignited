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
        height: '110%',
        width: '100%',
        objectFit: 'cover',
        zIndex: '-2'
    },
    foreground: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '110%',
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
    },
    contentContainer: {
        background: 'white',
        maskImage: 'linear-gradient(transparent, black 10%, black 90%, white)',
        height: '800px'
    },
    aboutSnippet: {
        width: '70%',
        paddingTop: '100px',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        flexFlow: 'row wrap'
    },
    aboutTitle: {
        width: '100%'
    },
    aboutText: {
        width: '70%',
        textAlign: 'justify'
    },
    aboutButton: {
        width: '30%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: '140px',
        height: '60px',
        fontFamily: "'Clicker Script', cursive",
        fontSize: '30px',
        textShadow: '#e5d7d7 1px 0px 5px',
        color: 'white',
        background: 'radial-gradient(ellipse at top, rgba(64, 69, 178, .92), transparent), radial-gradient(ellipse at bottom, rgba(56, 17, 17, 1), transparent)',
        borderRadius: '30px',
        border: 'none',
        filter: 'drop-shadow(2px 2px 1px #443356)',
        cursor: 'pointer',
        transition: 'opacity ease-in-out 1s',
        '@media (max-width: 720px)': {
            fontSize: '28px',
            width: '140px',
            height: '60px',
            marginTop: '15px'
        },
        '@media (max-width: 300px)': {
            fontSize: '20px',
            width: '110px',
            height: '40px',
            marginTop: '15px'
        },
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
            <div className={classes.contentContainer}>
                <div className={classes.aboutSnippet}>
                    <h1 className={classes.aboutTitle}>Our Mission</h1>
                    <h3 className={classes.aboutText}>Serenity Ignited, LLC is committed to helping people ignite the fire within themselves to move forward from past traumas and bring serenity to their lives. We empower people to stand in their own sovereignty, allowing them to embrace their true Self. We offer healing to help people access what they hold inside, meditations to help shape awareness of the world around us, a safe space to talk about it while they build their foundation, and tools that sustain them on their journey forward.</h3>
                    <div className={classes.aboutButton}>
                        <button className={classes.button}>Read More</button>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Landing