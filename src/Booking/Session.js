import React, { useState } from 'react'
import OptionCard from './OptionCard'


const Session = ({ setSession, updateView }) => {
    
    const [active, setActive] = useState(null)

    const onClick = (e) => {
        setActive(e.target.innerHTML)
    }

    const onConfirm = () => {
        setSession(active)
        updateView(2)
    }

    const options = {
        sampleSession: {
            id: 'Sample Session',
            description: ''
        },
        generalHealing: {
            id: 'General Healing',
            description: ''
        },
        inDepth: {
            id: 'In-Depth Healing',
            description: ''
        },
        accessBars: {
            id: 'Access Bars',
            description: ''
        },
        package1: {
            id: 'Reiki + Access Bars',
            description: ''
        }
    }

    return (
        <>
            <h3>Choose your healing session:</h3> 

            <h4>Reiki</h4>
                <OptionCard option={options.sampleSession} onClick={onClick} active={active === options.sampleSession.id ? true : false} />
                <OptionCard option={options.generalHealing} onClick={onClick} active={active === options.generalHealing.id ? true : false} />
                <OptionCard option={options.inDepth} onClick={onClick} active={active === options.inDepth.id ? true : false} />
            
            <h4>Access Consciousness</h4>
                <OptionCard option={options.accessBars} onClick={onClick} active={active === options.accessBars.id ? true : false} />
            
            <h4>Packages</h4>
                <OptionCard option={options.package1} onClick={onClick} active={active === options.package1.id ? true : false} />

            <button onClick={onConfirm}>continue</button>
        </>
    )
}

export default Session