import React, { useState, useEffect } from 'react'

import { createUseStyles } from 'react-jss'
import Authentication from '../Menu/Authentication'
import AppointmentCard from './AppointmentCard'
import { db } from '../index'
import { collection, addDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'

const useStyles = createUseStyles({
    viewContainer: {
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        background: 'white',
        overflowX: 'hidden',
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

const useAppointmentCardStyles = createUseStyles({
    appointmentCard: {
        margin: '20px',
        width: '400px',
        padding: '10px',
        background: 'radial-gradient(ellipse at top, rgba(232, 232, 185, .92) 1%, transparent), radial-gradient(ellipse at bottom, rgba(232, 232, 185, .92), transparent)',
        textShadow: '#e5d7d7 1px 0px 5px',
        textAlign: 'start',
        filter: 'drop-shadow(2px 2px 1px #443356)',
        'WebkitUserSelect' : 'none', /* Safari */        
        'MozUserSelect': 'none', /* Firefox */
        'msUserSelect': 'none', /* IE10+/Edge */
        userSelect: 'none'
    },
    h4: {
        margin: 0
    },
})

const formatDisplayName = (user) => {
    let firstName = user.displayName.split(' ')[0]
    return firstName
}
const SessionConfirmation = ({ user, session, connection, schedule }) => {
    
    const classes = useStyles()

    const [authFlow, setAuthFlow] = useState('sign-up')
    const [paymentMethod, setPaymentMethod] = useState(null)
    const [sessionConfirmed, setConfirmation] = useState(false)

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
            session: session,
            connection: connection,
            paymentMethod: paymentMethod,
            date: schedule.date.toISO(),
            timeISO: schedule.time.toISO(),
            userID: user.uid
        }).then(() => {
            console.log('Success! New Appointment has been logged in Firestore!')
            setConfirmation(true)
        }).catch((error) => {
            console.log(error)
            console.log('Something went wrong...')
        })
    }
    return (
        <div className={classes.viewContainer}>
            <h1>Please review your session details:</h1>
            <AppointmentCard session={session} connection={connection} date={schedule.date} time={schedule.time} useStyles={useAppointmentCardStyles}/>
            {user === null && 
                <>
                    <h3 className={classes.h3}>Please {authFlow === 'sign-up' ? 'create an account' : 'log in'} to continue finalizing your appointment:</h3>
                    {authFlow === 'sign-up' && <p className={classes.p} onClick={(e) => {e.preventDefault(); setAuthFlow('log-in')}}>I already have an account!</p>}
                    <Authentication authFlow={authFlow} />
                    
                </>}
            {(user != null && sessionConfirmed === false) && 
                <div>
                    <h3>Thank you for allowing me to join you on your healing journey, {formatDisplayName(user)}!</h3>
                    <h4>Specifying your payment method is the final step to securing your appointment. If your session will take place in person you can choose to pay at the time of your appointment, otherwise you will receive an invoice via email with a link to Square's secure online payment form to pay with your Credit/Debit card. If you would like to pay via PayPal, please contact me and we will make those arrangements.</h4>
                    <h3>Please select from the following payment method options:</h3>
                    <form id='payment-methods' className={classes.payMethodForm}>
                        {connection === 'In Person' && 
                        (<><input type='radio' id='in-person' name='payment-method' value='in-person' onChange={(e) => setPaymentMethod(e.target.value)} />
                        <label htmlFor='in-person'>{` With Cash/Check at Appointment`}</label></>)}
                        <br />
                        <input default='selected' type='radio' id='email-link' name='payment-method' value='email-link' onChange={(e) => setPaymentMethod(e.target.value)} />
                        <label htmlFor='email-link'>{` Online Payment Link Sent Via Email`}</label>
                        <br />
                        <button className={paymentMethod === null ? classes.buttonDisabled : classes.buttonEnabled} enabled={paymentMethod ? 'true' : 'false'} onClick={(e) => {e.preventDefault(); handleSubmit();}}>Schedule Appointment</button>
                    </form>
                </div>
            }
            {sessionConfirmed === true && 
                <div>
                    <h3>Your appointment has been booked! Here are some tips to keep in mind while preparing for your session.</h3>
                    <h4>Please visit the <Link to={`/${user.uid}/my-sessions`}>My Sessions</Link> page to view your upcoming appointments and edit or reschedule if need be.</h4>                
                </div>
            }
            
        </div>
    )
}

export default SessionConfirmation