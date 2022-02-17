import React from 'react'
import { createUseStyles } from 'react-jss'
import { DateTime } from 'luxon'

// const useStyles = createUseStyles({
//     appointmentCard: {
//         marginBottom: '20px',
//         width: '350px',
//         padding: '10px',
//         background: 'radial-gradient(ellipse at top, rgba(130, 150, 188, .7), transparent), radial-gradient(ellipse at bottom, rgba(130, 150, 188, .7), transparent)',
//         textShadow: '#e5d7d7 1px 0px 5px',
//         filter: 'drop-shadow(2px 2px 1px #443356)',
//     },
//     h4: {
//         margin: 0
//     },
// })
// date and time props will be luxon objects
const AppointmentCard = ({ session, connection, date, time, useStyles }) => {

    const classes = useStyles()
    
    return (
        <div className={classes.appointmentCard}>
            <h4 className={classes.h4}>{session.modality}: {session.id}</h4>
            <h4 className={classes.h4}>{connection} on {date.toLocaleString(DateTime.DATE_HUGE)}</h4>
            <h4 className={classes.h4}>{time.start.toLocaleString(DateTime.TIME_SIMPLE)} to {time.end.toLocaleString(DateTime.TIME_SIMPLE)}</h4>
        </div>
    )
}

export default AppointmentCard