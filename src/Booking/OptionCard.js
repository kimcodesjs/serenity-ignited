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
        background: 'radial-gradient(ellipse at top, rgba(130, 150, 188, .7), transparent), radial-gradient(ellipse at bottom, rgba(130, 150, 188, .7), transparent)',
        textShadow: '#e5d7d7 1px 0px 5px',
        filter: 'drop-shadow(2px 2px 1px #443356)',
        cursor: 'pointer',
        userSelect: 'none',
        overflow: 'hidden',
        '@media (max-width: 690px)': {
            width: '90%',
            height: '180px'
        }
    },
    activeOption: {
        display: 'inline-flex',
        flexDirection: 'column',
        width: '400px',
        height: '150px',
        borderRadius: '10px',
        marginRight: '20px',
        marginBottom: '10px',
        background: 'radial-gradient(ellipse at top, rgba(58, 127, 150, 1), transparent), radial-gradient(ellipse at bottom, rgba(130, 150, 188, 1), transparent)',
        textShadow: '#e5d7d7 1px 0px 5px',
        filter: 'drop-shadow(2px 2px 1px #443356)',
        cursor: 'pointer',
        userSelect: 'none',
        overflow: 'hidden',
        '@media (max-width: 690px)': {
            width: '90%',
            height: '180px'
        }
    },
    id: {
        marginTop: '10px',
        marginLeft: '20px',
        display: 'inline-block',
        fontSize: '25px'
    },
    description: {
        marginLeft: '20px',
        marginRight: '20px',
        fontSize: '18px',
        fontStyle: 'italic'
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