import React, { useState } from 'react'
import OptionCard from './OptionCard'
import { createUseStyles } from 'react-jss'


const Connection = ({ setConnection, updateView, session }) => {
    
    const [active, setActive] = useState(null)

    
    const onConfirm = () => {
        setConnection(active)
        updateView(3)
    }

    const options = {
        inPerson: {
            id: 'In Person',
            description: 'Meeting in person can offer a powerful healing experience. Your practitioner will meet you at the Serenity Ignited shop.'
        },
        remotePhone: {
            id: 'Remote by Phone',
            description: 'Your practitioner will call you at your chosen time so that you will be able to speak with them during your session.'
        },
        remoteVideo: {
            id: 'Remote by Video',
            description: 'Connect with your practitioner on camera via Facebook or Zoom.'
        },
        remote: {
            id: 'Remote',
            description: 'Receive your healing at a purely energetic level, with no physical or digital contact.'
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