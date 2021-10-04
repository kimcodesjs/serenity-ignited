import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    option: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '200px',
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
    activeOption: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '200px',
        height: '60px',
        marginBottom: '10px',
        '-webkit-box-shadow': '0px 5px 5px #0248ea',
            '-moz-box-shadow': '0px 5px 5px #0248ea',
        cursor: 'pointer',
        userSelect: 'none'
    }
})

const OptionCard = ({ option, onClick, active }) => {

    let classes = useStyles()

    return (
        <div onClick={onClick} className={ active ? classes.activeOption : classes.option} id={option.id}>{option.id}</div>
    )
}

export default OptionCard