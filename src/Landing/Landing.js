import React from 'react'
import { createUseStyles } from 'react-jss'
import EnergyHealing from './EnergyHealing'
import Reiki from './Reiki'
import Access from './Access'

const useStyles = createUseStyles({
    landing: {
        //display: 'inline-flex',
        // flexDirection: 'row',
        // alignItems: 'center',
        //justifyContent: 'center',
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
        width: '35%',
        marginLeft: '85px',
        marginRight: '75px',
        marginTop: '14%',
        float: 'right',
        filter: 'drop-shadow(5px 5px 1px #443356)',
        "@media (max-width: 1180px)": {
            fontSize: '32px',
            width: '30%'
        },
        "@media (max-width: 900px)": {
            flexDirection: 'column',
            margin: 0,
            width: '75%'
        }
    },
    logo: {
        width: '50%',
        height: 'auto',
        filter: 'drop-shadow(7px 7px 1px #443356)',
        "@media (max-width: 900px)": {
            marginRight: '50px',
            //marginTop: '50px',
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
            <EnergyHealing />
            <Reiki />
            <Access />
        </>
    )

}

export default Landing