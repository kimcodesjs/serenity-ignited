import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    option: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '400px',
        height: '100px',
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
        width: '400px',
        height: '100px',
        marginBottom: '10px',
        '-webkit-box-shadow': '0px 5px 5px #0248ea',
            '-moz-box-shadow': '0px 5px 5px #0248ea',
        cursor: 'pointer',
        userSelect: 'none'
    },
    id: {
        margin: '10px'  
    },
    description: {
        marginRight: '10px'
    },
    price: {
        marginRight: '10px'
    }
})

const OptionCard = ({ option, setActive, active}) => {

    let classes = useStyles()

    const onClick = () => {
        setActive(option)
    }

    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })

    return (
        <div onClick={onClick} className={ active ? classes.activeOption : classes.option} id={option.id}>
            <div className={classes.id}>{option.id}</div>
            <div className={classes.description}>{option.description}</div>
            {option.price ? <div className={classes.price}>{currencyFormatter.format(option.price)}</div> : null}
        </div>
    )
}

export default OptionCard