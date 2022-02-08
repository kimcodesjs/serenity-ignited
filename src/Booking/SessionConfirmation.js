import React, { useState } from 'react'
import { DateTime } from 'luxon'
import { createUseStyles } from 'react-jss'
import Authentication from '../Menu/Authentication'
import PaymentForm from './PaymentForm'

const useStyles = createUseStyles({
    appointmentCard: {
        marginBottom: '20px',
        width: '350px',
        padding: '10px',
        background: 'radial-gradient(ellipse at top, rgba(130, 150, 188, .7), transparent), radial-gradient(ellipse at bottom, rgba(130, 150, 188, .7), transparent)',
        textShadow: '#e5d7d7 1px 0px 5px',
        filter: 'drop-shadow(2px 2px 1px #443356)',
    },
    h4: {
        margin: 0
    },
    h3: {
        marginBottom: '5px'
    },
    p: {
        marginTop: '0',
        fontStyle: 'italic',
        fontSize: '15px',
        cursor: 'pointer',
        userSelect: 'none'
    }
})
const formatDisplayName = (user) => {
    let firstName = user.displayName.split(' ')[0]
    return firstName
}
const SessionConfirmation = ({ user, setUser, session, connection, schedule }) => {
    
    const classes = useStyles()

    const [authFlow, setAuthFlow] = useState('sign-up')

    return (
        <>
            <h2>Session Confirmation</h2>
            <div className={classes.appointmentCard}>
                <h4 className={classes.h4}>{session.modality} {session.id}</h4>
                <h4 className={classes.h4}>{connection.id} on {schedule.date.toLocaleString(DateTime.DATE_HUGE)}</h4>
                <h4 className={classes.h4}>{schedule.time.start.toLocaleString(DateTime.TIME_SIMPLE)} to {schedule.time.end.toLocaleString(DateTime.TIME_SIMPLE)}</h4>
            </div>
            {user === null && 
                <>
                    <h3 className={classes.h3}>Please {authFlow === 'sign-up' ? 'create an account' : 'log in'} to continue finalizing your appointment:</h3>
                    {authFlow === 'sign-up' && <p className={classes.p} onClick={(e) => {e.preventDefault(); setAuthFlow('log-in')}}>I already have an account!</p>}
                    <Authentication authFlow={authFlow} setUser={setUser} />
                    
                </>}
            {user != null && 
                <div>
                    <h3>Thank you for allowing me to join you on your healing journey, {formatDisplayName(user)}!</h3>
                </div>
            }
            
        </>
    )
}

export default SessionConfirmation