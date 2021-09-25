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
        '-webkit-box-shadow': '0px 5px 5px #b7d9e9',
        '-moz-box-shadow': '0px 1px 1px #b7d9e9',
        boxShadow :'0px 1px 1px',
        '&:hover': {
            '-webkit-box-shadow': '0px 5px 5px #0248ea',
            '-moz-box-shadow': '0px 5px 5px #0248ea'
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
        '-webkit-box-shadow': '0px 5px 5px #0248ea',
            '-moz-box-shadow': '0px 5px 5px #0248ea',
        cursor: 'pointer',
        userSelect: 'none'
    }
})

const Session = ({ setSession, updateView }) => {
    
    const [active, setActive] = useState(null)
    const onClick = (e) => {
        setActive(e.target.innerHTML)
    }

    const onConfirm = () => {
        setSession(active)
        updateView(2)
    }

    let classes = useStyles()
    return (
        <>
            <h3>Choose your healing session:</h3> 

            <h4>Reiki</h4>
                <div onClick={onClick} className={active === 'Sample Session' ? classes.optionSelect : classes.option}>Sample Session</div>
                <div onClick={onClick} className={active === 'General Healing' ? classes.optionSelect : classes.option}>General Healing</div>
                <div onClick={onClick} className={active === 'In-Depth Healing' ? classes.optionSelect : classes.option}>In-Depth Healing</div>
            
            <h4>Access Consciousness</h4>
                <div onClick={onClick} className={active === 'Access Bars' ? classes.optionSelect : classes.option}>Access Bars</div>
            
            <h4>Packages</h4>
                <div onClick={onClick} className={active === 'Reiki + Access Bars' ? classes.optionSelect : classes.option}>Reiki + Access Bars</div>

            <button onClick={onConfirm}>continue</button>
        </>
    )
}

export default Session