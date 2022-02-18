import React, { useState } from 'react'
import OptionCard from './OptionCard'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    options: {
        display: 'inline-flex',
        flexFlow: 'row wrap',
        marginTop: '10px',
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


const Connection = ({ setConnection, updateView, session }) => {
    
    const classes = useStyles()

    const [active, setActive] = useState(null)

    
    const onConfirm = () => {
        if (active) {
        setConnection(active)
        updateView(3)
        }
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
            <div className={active ? classes.continueEnabled : classes.continueDisabled} onClick={onConfirm}>Continue</div>
            <br />
            {session === 'Sample Session' || session === 'General Healing' || session === 'In-Depth Healing' ?
                <div className={classes.options}> 
                    <OptionCard option={options.inPerson} setActive={setActive} active={active && active.id === options.inPerson.id ? true : false} />
                    <OptionCard option={options.remotePhone} setActive={setActive} active={active && active.id === options.remotePhone.id ? true : false} />
                    <OptionCard option={options.remoteVideo} setActive={setActive} active={active && active.id === options.remoteVideo.id ? true : false} />
                    <OptionCard option={options.remote} setActive={setActive} active={active && active.id === options.remote.id ? true : false} />
                </div>
                : 
                <div>
                    <OptionCard option={options.inPerson} setActive={setActive} active={active && active.id === options.inPerson.id ? true : false} />
                </div>}
        </>
    )
}

export default Connection