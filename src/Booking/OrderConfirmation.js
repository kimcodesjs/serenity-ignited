import React from 'react'
import { DateTime } from 'luxon'
import { createUseStyles } from 'react-jss'
import PaymentForm from './PaymentForm'

const useStyles = createUseStyles({

})
const OrderConfirmation = ({ session, connection, schedule}) => {
    
    const classes = useStyles()

    return (
        <>
            <h3>Session Confirmation</h3>
            <h4>{session.id}, {connection.id} </h4>
            <h4>{schedule.date.toLocaleString(DateTime.DATE_HUGE)} at {schedule.time.start.toLocaleString(DateTime.TIME_SIMPLE)} to {schedule.time.end.toLocaleString(DateTime.TIME_SIMPLE)}</h4>
            <div className={classes.userDetails}>
                <h5>First Name:</h5>
                <input type='text'></input>
                <h5>Last Name:</h5>
                <input type='text'></input>
                <h5>Email:</h5>
                <input type='text'></input>
                
            </div>
        </>
    )
}

export default OrderConfirmation