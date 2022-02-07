import React from 'react'
import { DateTime } from 'luxon'
import { createUseStyles } from 'react-jss'
import Authentication from '../Menu/Authentication'
import PaymentForm from './PaymentForm'

const useStyles = createUseStyles({
    appointmentCard: {
        // backgroundColor: '#ddd496',
        // backgroundImage: 'url("paper-texture.jpg")',
        // backgroundSize: 'contain',
        // backgroundPostion: 'center',
        // backgroundRepeat: 'no-repeat',
        // borderRadius: '10px',
        width: '50%',
        padding: '10px',
    },
    h4: {
        margin: 0
    }
})
const formatDisplayName = (user) => {
    let firstName = user.displayName.split(' ')[0]
    return firstName
}
const SessionConfirmation = ({ user, setUser, session, connection, schedule }) => {
    
    const classes = useStyles()

    return (
        <>
            <h2>Session Confirmation</h2>
            {user != null && 
                <div>
                    <h4>Thank you for allowing me to join you on your healing journey, {formatDisplayName(user)}!</h4>
                </div>
            }
            <div className={classes.appointmentCard}>
                <h4 className={classes.h4}>{session.modality} {session.id}</h4>
                <h4 className={classes.h4}>{connection.id} on {schedule.date.toLocaleString(DateTime.DATE_HUGE)}</h4>
                <h4 className={classes.h4}>{schedule.time.start.toLocaleString(DateTime.TIME_SIMPLE)} to {schedule.time.end.toLocaleString(DateTime.TIME_SIMPLE)}</h4>
            </div>
            {user === null && <Authentication authFlow='sign-up' setUser={setUser} />}
            
        </>
    )
}

export default SessionConfirmation