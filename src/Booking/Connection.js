import React, { useState } from 'react'
import OptionCard from './OptionCard'
import { createUseStyles } from 'react-jss'


const Connection = ({ setConnection, updateView, session }) => {
    
    const [active, setActive] = useState(null)

    const onClick = (e) => {
        setActive(e.target.innerHTML)
    }
    const onConfirm = () => {
        setConnection(active)
        updateView(3)
    }

    const options = {
        inPerson: {
            id: 'In Person at Serenity Ignited',
            description: ''
        },
        remotePhone: {
            id: 'Remote by Phone',
            description: ''
        },
        remoteVideo: {
            id: 'Remote by Video',
            description: ''
        },
        remote: {
            id: 'Remote',
            description: ''
        }
    }
    return (
        <>
            <h3>Select how you would prefer to connect:</h3>
            {session === 'Sample Session' || session === 'General Healing' || session === 'In-Depth Healing' ?
                <div> 
                    <OptionCard option={options.inPerson} onClick={onClick} active={active === options.inPerson.id ? true : false} />
                    <OptionCard option={options.remotePhone} onClick={onClick} active={active === options.remotePhone.id ? true : false} />
                    <OptionCard option={options.remoteVideo} onClick={onClick} active={active === options.remoteVideo.id ? true : false} />
                    <OptionCard option={options.remote} onClick={onClick} active={active === options.remote.id ? true : false} />
                </div>
                : 
                <div>
                    <OptionCard option={options.inPerson} onClick={onClick} active={active === options.inPerson.id ? true : false} />
                </div>}
            <button onClick={onConfirm}>Continue</button>
        </>
    )
}

export default Connection