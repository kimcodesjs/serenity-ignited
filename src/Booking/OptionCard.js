import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    
    
    option: {
        display: 'inline-flex',
        flexDirection: 'column',
        width: '400px',
        height: '150px',
        borderRadius: '10px',
        marginRight: '20px',
        marginBottom: '10px',
        background: 'rgba(56, 17, 17, .75)',
        color: 'white',
        // '-webkit-box-shadow': '0px 5px 5px #b7d9e9',
        // '-moz-box-shadow': '0px 1px 1px #b7d9e9',
        // boxShadow :'0px 1px 1px',
        // '&:hover': {
        //     '-webkit-box-shadow': '0px 5px 5px #0248ea',
        //     '-moz-box-shadow': '0px 5px 5px #0248ea'
        // },
        filter: 'drop-shadow(5px 5px 1px #443356)',
        cursor: 'pointer',
        userSelect: 'none',
        overflow: 'hidden',
        '@media (max-width: 690px)': {
            width: '90%',
            height: '180px'
        }
    },
    activeOption: {
        width: '400px',
        height: '150px',
        borderRadius: '10px',
        marginRight: '20px',
        marginBottom: '10px',
        background: 'rgba(56, 17, 17, .75)',
        color: 'white',
        '-webkit-box-shadow': '0px 5px 5px #0248ea',
            '-moz-box-shadow': '0px 5px 5px #0248ea',
        cursor: 'pointer',
        userSelect: 'none',
        '@media (max-width: 690px)': {
            width: '90%',
            height: '180px'
        }
    },
    id: {
        marginTop: '20px',
        marginLeft: '20px',
        display: 'inline-block',
    },
    description: {
        marginLeft: '20px',
        marginRight: '20px',
        fontSize: '12px'
    },
    price: {
        margin: '20px'
    },
    duration: {
        fontStyle: 'italic',
        margin: '10px',
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
            <span className={classes.id}>{option.id}</span>
            <div>
                {option.price ? <span className={classes.price}>{currencyFormatter.format(option.price)}</span> : null}
                {option.duration ? <span className={classes.duration}>{`${option.duration.hours}h ${option.duration.minutes}m`}</span> : null}
            </div>
            <div className={classes.description}>{option.description}</div>
        </div>
    )
}

export default OptionCard