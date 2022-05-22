import React from 'react'
import OptionCard from './OptionCard'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    viewContainer: {
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        overflowX: 'hidden',
        transition: 'opacity ease-in-out 1s'
    },
    viewPrompt: {
        marginBottom: '0',
        marginLeft: '10px',
        marginRight: '10px',
        '@media (max-width: 920px)': {
            fontSize: '24px',
            marginLeft: '70px',
            marginRight: '70px'
        }
    },
    optionContainer: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '900px',
        borderRadius: '10px',
    },
    options: {
        display: 'inline-flex',
        flexFlow: 'row wrap',
        marginTop: '10px',
        height: '78vh',
        borderRadius: '10px',
        overflow: 'scroll',
        overflowX: 'hidden',
        '&::-webkit-scrollbar': {
            backgroundColor: '#99bac9',
            borderRadius: '10px',
            width: '10px'
        },
        '&::-webkit-scrollbar-thumb': {
            background: '#aa99c9',
            borderRadius: '10px'
        }
    }
})


const Connection = ({ setConnection, connection, inPersonOnly }) => {
    
    const classes = useStyles()

    const options = [
        {
            id: 'In Person',
            description: 'Meeting in person can offer a powerful healing experience. Your practitioner will meet you at the Serenity Ignited shop.'
        },
        {
            id: 'Remote by Phone',
            description: 'Your practitioner will call you at your chosen time so that you will be able to speak with them during your session.'
        },
        {
            id: 'Remote by Video',
            description: 'Connect with your practitioner on camera via Facebook or Zoom.'
        },
        {
            id: 'Remote',
            description: 'Receive your healing at a purely energetic level, with no physical or digital contact.'
        }
    ]

    return (
        <div className={classes.viewContainer}>
            <h1 className={classes.viewPrompt}>Select how you would prefer to connect:</h1>
            <div className={classes.optionContainer}>
                {!inPersonOnly ?
                    options.map(option => (
                        <OptionCard key={option.id} option={option} setActive={setConnection} active={connection && connection.id === option.id ? true : false} />
                    ))
                    : 
                    <div>
                        <OptionCard option={options[0]} setActive={setConnection} active={connection && connection.id === options[0].id ? true : false} />
                    </div>
                }
            </div>
        </div>
    )
}

export default Connection