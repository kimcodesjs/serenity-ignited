import React from 'react'
import { createUseStyles } from 'react-jss'
import EnergyHealing from './EnergyHealing'
import Reiki from './Reiki'
import Access from './Access'

const useStyles = createUseStyles({
    landingContainer: {
        // background: 'radial-gradient(ellipse at top, rgba(232, 232, 185, .92), transparent), radial-gradient(ellipse at bottom, rgba(232, 232, 185, .92), transparent), url("/2.png")',
        // backgroundAttachment: 'fixed',
        // backgroundSize: 'cover',
        // paddingTop: '50px',
        width: '100vw',
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        perspective: '10px'
    },
    header: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        transformStyle: 'preserve-3d',
        zIndex: '-1',
        //background: 'linear-gradient(to bottom, rgba(56, 17, 17, .92), rgba(60, 23, 89, .0))'
    },
    background: {
        position: 'absolute',
        height: '100%',
        width: '110%',
        objectFit: 'cover',
        zIndex: '-1',
        transform: 'translateZ(-10px) scale(2)'
    },
    foreground: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        objectFit: 'cover',
        zIndex: '-1',
        opacity: '.5',
        transform: 'translateZ(-5px) scale(1.5)'
    },
    landing: {
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        minHeight: '915px',
        backgroundImage: 'linear-gradient(to right, rgba(56, 17, 17, .92), rgba(60, 23, 89, .0)),url("1.png")',
        backgroundAttachment: 'fixed',
        '-webkit-mask-image': 'linear-gradient(black 90%, transparent)',
        maskImage: 'linear-gradient(black 90%, transparent)',
        "@media (max-width: 900px)": {
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundImage: 'linear-gradient(to bottom, rgba(56, 17, 17, .92), rgba(60, 23, 89, .0)),url("angel wings chakras 1.jpg")',
            minHeight: '700px'
        }
        
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
        paddingBottom: '30px',
        filter: 'drop-shadow(5px 5px 1px #443356)',
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
        filter: 'drop-shadow(7px 7px 1px #443356)',
        "@media (max-width: 400px)": {
            width: '90%',
            height: 'auto'
        }
    }
})

const Landing = () => {
    const classes = useStyles()
    return (
        <div className={classes.landingContainer}>
        <div className={classes.header}>
            <img src='/1.png' className={classes.background}/>
            <img src='/4.png' className={classes.foreground}/>
            <img src='serenity-ignited-logo.png' width='50%' height='auto' className={classes.logo}/>
            <p className={classes.greeting}>
                Let us walk with you on your journey to find peace, happiness, and serenity.
            </p>
        </div>
            <EnergyHealing />
            <Reiki />
            <Access />
        </div>
    )

}

export default Landing