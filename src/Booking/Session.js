import React, { useState } from 'react'
import OptionCard from './OptionCard'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    
    optionContainer: {
        marginTop: '20px',
        height: '65%',
        borderRadius: '10px',
        // overflow: 'scroll',
        // overflowX: 'hidden',
        // '&::-webkit-scrollbar': {
        //     backgroundColor: '#99bac9',
        //     borderRadius: '10px',
        //     width: '10px'
        // },
        // '&::-webkit-scrollbar-thumb': {
        //     background: '#aa99c9',
        //     borderRadius: '10px'
        // }
    },
    options: {
        display: 'inline-flex',
        flexFlow: 'row wrap'
    },
    selected: {
        fontStyle: 'italic'
    },
    continueEnabled: {
        marginRight: '25%',
        marginTop: '20px',
        width: '85px',
        textAlign: 'center',
        userSelect: 'none',
        cursor: 'pointer',
        background: 'radial-gradient(ellipse at top, rgba(130, 150, 188, .7), transparent), radial-gradient(ellipse at bottom, rgba(130, 150, 188, .7), transparent)',
        textShadow: '#e5d7d7 1px 0px 5px',
        filter: 'drop-shadow(2px 2px 1px #443356)',
        borderRadius: '10px',
        fontWeight: 'bold'
    },
    continueDisabled: {
        marginRight: '25%',
        marginTop: '20px',
        width: '85px',
        textAlign: 'center',
        userSelect: 'none',
        background: 'radial-gradient(ellipse at top, rgba(94, 94, 94, .7), transparent), radial-gradient(ellipse at bottom, rgba(100, 100, 100, .7), transparent)',
        color: '#b2b2b2',
        textShadow: '#e5d7d7 1px 0px 5px',
        filter: 'drop-shadow(2px 2px 1px #443356)',
        borderRadius: '10px',
        fontWeight: 'bold'
    }
})


const Session = ({ setSession, updateView }) => {

    const classes = useStyles()
    // active is storing the current user selected session type, set with an onClick handler inside of OptionCard.js
    const [active, setActive] = useState(null)

    // onConfirm passes the selected Session Object back to Booking.js, stored in state as session, and updates UI
    const onConfirm = () => {
        if (active) {
        setSession(active)
        updateView(2)
        }
    }

    // Session Objects
    const options = {
        sampleSession: {
            id: 'Sample Session',
            modality: 'Reiki',
            description: 'A short sample session for those who are interested in testing the waters without committing to a full price session.',
            duration: { hours: 0, minutes: 15 },
            price: 20
        },
        generalHealing: {
            id: 'General Healing',
            modality: 'Reiki',
            description: 'A general cleansing of the 7 major Chakras, plus one area of focus.',
            duration: { hours: 0, minutes: 30},
            price: 40
        },
        inDepth: {
            id: 'In-Depth Healing',
            modality: 'Reiki',
            description: 'An extensive healing session targeting specific areas of improvement.',
            duration: { hours: 1, minutes: 0 },
            price: 65
        },
        accessBars: {
            id: 'Access Bars',
            modality: 'Access Consciousness',
            description: 'A full-length Access Bars session to clear energy blockages in the subconscious mind.',
            duration: { hours: 1, minutes: 30 },
            price: 150
        },
        accessPartial: {
            id: 'Partial Access Bars',
            modality: 'Access Consciousness',
            description: 'A shorter Access Bars session.',
            duration: { hours: 0, minutes: 45 },
            price: 75
        },
        package1: {
            id: 'Reiki + Access Bars',
            modality: 'Package Session',
            description: 'A powerful combination session of Reiki and Access Bars healing.',
            duration: { hours: 0, minutes: 45 },
            price: 75
        }
    }
    
    return (
        <>       
            <h3>Choose your healing session:</h3>
            <div className={active ? classes.continueEnabled : classes.continueDisabled} onClick={onConfirm}>Continue</div>
            <div className={classes.optionContainer}>
                <h4>Reiki</h4>
                    <div className={classes.options}>
                    <OptionCard option={options.sampleSession} setActive={setActive} active={active && active.id === options.sampleSession.id ? true : false} />
                    <OptionCard option={options.generalHealing} setActive={setActive} active={active && active.id === options.generalHealing.id ? true : false} />
                    <OptionCard option={options.inDepth} setActive={setActive} active={active && active.id === options.inDepth.id ? true : false} />
                    </div>
                <h4>Access Consciousness</h4>
                    <OptionCard option={options.accessBars} setActive={setActive} active={active && active.id === options.accessBars.id ? true : false} />
                
                <h4>Packages</h4>
                    <OptionCard option={options.package1} setActive={setActive} active={active && active.id === options.package1.id ? true : false} />
            </div>
        </>
    )
}

export default Session