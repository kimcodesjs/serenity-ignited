import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    option: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100px',
        height: '60px',
        marginBottom: '10px',
        boxShadow :'0px 1px 1px',
        '-webkit-box-shadow': '0px 5px 5px #b7d9e9',
        '-moz-box-shadow': '0px 1px 1px #b7d9e9',
        '&:hover': {
            '-webkit-box-shadow': '0px 5px 5px #0248ea',
            '-moz-box-shadow': '0px 5px 5px #0248ea',
        },
        cursor: 'pointer',
        userSelect: 'none'
    },
    optionSelect: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100px',
        height: '60px',
        marginBottom: '10px',
        boxShadow :'0px 1px 1px',
        '-webkit-box-shadow': '0px 5px 5px #0248ea',
        '-moz-box-shadow': '0px 5px 5px #0248ea',
        cursor: 'pointer',
        userSelect: 'none'
    }
})

const Connection = ({ setConnection, updateView, session }) => {
    
    const [active, setActive] = useState(null)

    let classes = useStyles()

    const onClick = (e) => {
        setActive(e.target.innerHTML)
    }
    const onConfirm = () => {
        setConnection(active)
        updateView(3)
    }
    return (
        <>
            <h3>Select how you would prefer to connect:</h3>
            {session === 'Sample Session' || session === 'General Healing' || session === 'In-Depth Healing' ?
                <div> 
                    <div className={active !== 'In Person' ? classes.option : classes.optionSelect} onClick={onClick}>In Person</div> 
                    <div className={active !== 'Remote' ? classes.option : classes.optionSelect} onClick={onClick}>Remote</div>
                </div>
                : 
                <div>
                    <div className={active !== 'In Person' ? classes.option : classes.optionSelect} onClick={onClick}>In Person</div>
                </div>}
            <button onClick={onConfirm}>confirm</button>
        </>
    )
}

export default Connection