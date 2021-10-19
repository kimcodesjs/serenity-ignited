import React, { useState } from 'react'
import OptionCard from './OptionCard'


const Session = ({ setSession, updateView }) => {

    // active is storing the current user selected session type, set with an onClick handler inside of OptionCard.js
    const [active, setActive] = useState(null)

    // onConfirm passes the selected Session Object back to Booking.js, stored in state as session, and updates UI
    const onConfirm = () => {
        setSession(active)
        updateView(2)
    }

    // Session Objects
    const options = {
        sampleSession: {
            id: 'Sample Session',
            description: 'A short sample session for those who are interested in testing the waters without committing to a full price session.',
            duration: { minutes: 15 },
            price: 20
        },
        generalHealing: {
            id: 'General Healing',
            description: 'A general cleansing session for those in need of a little more than what the sample session offers.',
            duration: { minutes: 30},
            price: 40
        },
        inDepth: {
            id: 'In-Depth Healing',
            description: 'An extensive healing session, typically useful in targeting a specific ailment.',
            duration: { hours: 1 },
            price: 65
        },
        accessBars: {
            id: 'Access Bars',
            description: 'A full-length Access Bars session to clear energy blockages in your consciousness.',
            duration: { hours: 1, minutes: 30 },
            price: 150
        },
        accessPartial: {
            id: 'Partial Access Bars',
            description: 'A shorter Access Bars session.',
            duration: { minutes: 45 },
            price: 75
        },
        package1: {
            id: 'Reiki + Access Bars',
            description: 'A powerful combo session of Reiki and Access Bars healing.',
            duration: { minutes: 45 },
            price: 75
        }
    }
    
    return (
        <>
            <h3>Choose your healing session:</h3> 
            
            <h4>Reiki</h4>
                <OptionCard option={options.sampleSession} setActive={setActive} active={active && active.id === options.sampleSession.id ? true : false} />
                <OptionCard option={options.generalHealing} setActive={setActive} active={active && active.id === options.generalHealing.id ? true : false} />
                <OptionCard option={options.inDepth} setActive={setActive} active={active && active.id === options.inDepth.id ? true : false} />
            
            <h4>Access Consciousness</h4>
                <OptionCard option={options.accessBars} setActive={setActive} active={active && active.id === options.accessBars.id ? true : false} />
            
            <h4>Packages</h4>
                <OptionCard option={options.package1} setActive={setActive} active={active && active.id === options.package1.id ? true : false} />

            <button onClick={onConfirm}>continue</button>
        </>
    )
}

export default Session