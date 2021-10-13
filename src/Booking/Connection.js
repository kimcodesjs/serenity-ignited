import React, { useState } from 'react'
import OptionCard from './OptionCard'
import { createUseStyles } from 'react-jss'


const Connection = ({ setConnection, updateView, session }) => {
    
    const [active, setActive] = useState(null)

    
    const onConfirm = () => {
        setConnection(active.id)
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
                    <OptionCard option={options.inPerson} setActive={setActive} active={active && active.id === options.inPerson.id ? true : false} />
                    <OptionCard option={options.remotePhone} setActive={setActive} active={active && active.id === options.remotePhone.id ? true : false} />
                    <OptionCard option={options.remoteVideo} setActive={setActive} active={active && active.id === options.remoteVideo.id ? true : false} />
                    <OptionCard option={options.remote} setActive={setActive} active={active && active.id === options.remote.id ? true : false} />
                </div>
                : 
                <div>
                    <OptionCard option={options.inPerson} setActive={setActive} active={active && active.id === options.inPerson.id ? true : false} />
                </div>}
            <button onClick={onConfirm}>Continue</button>
        </>
    )
}

export default Connection