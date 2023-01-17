import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import EnergyHealing from './EnergyHealing'
import Reiki from './Reiki'
import Access from './Access'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    banner: {
        width: '100%'
    },
    h1: {
        fontFamily: "'Euphoria Script', cursive",
        fontSize: '50px',
        textShadow: '#381111 1px 0px 20px',
        "@media (max-width: 1040px)": {
            fontSize: '35px'
        },
        "@media (max-width: 740px)": {
            fontSize: '25px'
        }
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

const LearningCenter = () => {

    const classes = useStyles()
    return (
        <>
            <img src='stars-and-lake.jpg' className={classes.banner} />
            <h1 className={classes.h1}>Experience Serenity in Healing</h1>
            <p>Put simply, Energy Healing is the means by which we restore energetic harmony within ourselves, to promote peace and well-being. It is a holistic approach to healing the mind and body, predicated upon the understanding that they are connected energetically in a powerful way. This connection is intricate and dynamic, yet fragile in that an imbalance of the energies within us will manifest physical and mental ailments. Energy Healing practitioners work to restore balance to the energetic body, alleviating the symptoms we experience by treating the root cause.</p>
            <Link to='energy-healing' className={classes.button}>Learn More</Link>
            <Routes>
                <Route path='energy-healing' element={<EnergyHealing />} />
                <Route path='reiki' element={<Reiki />} />
                <Route path='access-consciousness' element={<Access />} />
            </Routes>
        </>
    )
}

export default LearningCenter