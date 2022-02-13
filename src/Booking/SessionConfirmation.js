import React, { useState, useEffect } from 'react'
import { DateTime } from 'luxon'
import { createUseStyles } from 'react-jss'
import Authentication from '../Menu/Authentication'
import { db } from '../index'
import { collection, addDoc } from 'firebase/firestore'

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
    },
    buttonEnabled: {
        marginRight: '25%',
        marginTop: '20px',
        width: '85px',
        textAlign: 'center',
        userSelect: 'none',
        cursor: 'pointer',
        background: 'radial-gradient(ellipse at top, rgba(130, 150, 188, .7), transparent), radial-gradient(ellipse at bottom, rgba(130, 150, 188, .7), transparent)',
        textShadow: '#e5d7d7 1px 0px 5px',
        filter: 'drop-shadow(2px 2px 1px #443356)',
        borderRadius: '10px',
        fontWeight: 'bold'
    },
    buttonDisabled: {
        marginRight: '25%',
        marginTop: '20px',
        width: '85px',
        textAlign: 'center',
        userSelect: 'none',
        background: 'radial-gradient(ellipse at top, rgba(94, 94, 94, .7), transparent), radial-gradient(ellipse at bottom, rgba(100, 100, 100, .7), transparent)',
        color: '#b2b2b2',
        textShadow: '#e5d7d7 1px 0px 5px',
        filter: 'drop-shadow(2px 2px 1px #443356)',
        borderRadius: '10px',
        fontWeight: 'bold'
    }
})
const formatDisplayName = (user) => {
    let firstName = user.displayName.split(' ')[0]
    return firstName
}
const SessionConfirmation = ({ user, setUser, session, connection, schedule }) => {
    
    const classes = useStyles()

    const [authFlow, setAuthFlow] = useState('sign-up')
    const [paymentMethod, setPaymentMethod] = useState(null)
    const [newSession, setNewSession] = useState({})

    // useEffect(() => {   
    //     setNewSession({
    //         user: user.uid,
    //         session: session,
    //         connection: connection,
    //         schedule: schedule,
    //         paymentMethod: paymentMethod
    //     })
    // }, [paymentMethod])

    /* create Appointments collection in firestore, outline data structure, will not be able to store luxon objects... ISOs instead? */

    const handleSubmit = async () => {
        await addDoc(collection(db, 'Appointments'), {
            connection: connection.id,
            duration: {
                hours: session.duration.hours,
                minutes: session.duration.minutes
            },
            modality: session.modality,
            paymentMethod: paymentMethod,
            price: session.price,
            sessionID: session.id,
            DateTimeISO: schedule.time.start.toISO(),
            userID: user.uid
        }).then(() => {
            console.log('Success! New Appointment has been logged in Firestore!')
        }).catch((error) => {
            console.log(error)
            console.log('Something went wrong...')
        })
    }
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
                    <h4>Specifying your payment method is the final step to securing your appointment. You can choose to pay in person at the time of your appointment, or if you would prefer to pay with your Credit/Debit card, please select the option to receive a payment link via email. The email you receive will contain an invoice for the appointment and a link to Square's secure online payment form. If you would like to pay via PayPal, please select the in person payment method and reach out to me before your session.</h4>
                    <h3>Please select from the following payment method options:</h3>
                    <form id='payment-methods' className={classes.payMethodForm}>
                        <input type='radio' id='in-person' name='payment-method' value='in-person' onChange={(e) => setPaymentMethod(e.target.value)} />
                        <label htmlFor='in-person'>With Cash/Check at Appointment</label>
                        <br />
                        <input type='radio' id='email-link' name='payment-method' value='email-link' onChange={(e) => setPaymentMethod(e.target.value)} />
                        <label htmlFor='email-link'>Online Payment Link Sent Via Email</label>
                        <br />
                        <button className={paymentMethod === null ? classes.buttonDisabled : classes.buttonEnabled} enabled={paymentMethod ? 'true' : 'false'} onClick={(e) => {e.preventDefault(); handleSubmit();}}>Schedule Appointment</button>
                    </form>
                </div>
            }
            
        </>
    )
}

export default SessionConfirmation