import React, { useState, useEffect } from 'react'

import { createUseStyles } from 'react-jss'
import Authentication from '../../Menu/Authentication'
import AppointmentCard from './AppointmentCard'
import { db } from '../../index'
import { collection, addDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'

const useStyles = createUseStyles({
    viewContainer: {
        height: '88vh',
        width: '70%',
        maxWidth: '800px',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        overflowX: 'hidden',
    },
    viewPrompt: {
        marginBottom: '0',
        '@media (max-width: 920px)': {
            fontSize: '24px',
            marginLeft: '70px',
            marginRight: '70px'
        }
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
    paymentSelect: {
        background: 'radial-gradient(ellipse at top, rgba(232, 232, 185, .92) 1%, rgba(207, 194, 213, .4)), radial-gradient(ellipse at bottom, rgba(232, 232, 185, .92), transparent)',
        borderRadius: '10px',
        filter: 'drop-shadow(2px 2px 1px #443356)',
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '15px'
    },
    buttonEnabled: {
        // height: '60px',
        // width: '170px',
        marginTop: '30px',
        fontFamily: "'Clicker Script', cursive",
        fontSize: '24px',
        textShadow: '#e5d7d7 1px 0px 5px',
        color: 'white',
        background: 'radial-gradient(ellipse at top, rgba(64, 69, 178, .92), transparent), radial-gradient(ellipse at bottom, rgba(56, 17, 17, 1), transparent)',
        borderRadius: '30px',
        border: 'none',
        filter: 'drop-shadow(2px 2px 1px #443356)',
        cursor: 'pointer',
        transition: 'opacity ease-in-out 1s',
        '@media (max-width: 720px)': {
            fontSize: '28px',
            width: '140px',
            height: '60px',
            marginTop: '15px'
        },
        '@media (max-width: 300px)': {
            fontSize: '20px',
            width: '110px',
            height: '40px',
            marginTop: '15px'
        },
    },
    buttonDisabled: {
        marginTop: '30px',
        fontFamily: "'Clicker Script', cursive",
        fontSize: '24px',
        textShadow: '#e5d7d7 1px 0px 5px',
        color: 'white',
        background: 'radial-gradient(ellipse at top, rgba(64, 69, 178, .92), transparent), radial-gradient(ellipse at bottom, rgba(56, 17, 17, 1), transparent)',
        borderRadius: '30px',
        border: 'none',
        filter: 'drop-shadow(2px 2px 1px #443356)',
        cursor: 'pointer',
        transition: 'opacity ease-in-out 1s',
        '@media (max-width: 720px)': {
            fontSize: '28px',
            width: '140px',
            height: '60px',
            marginTop: '15px'
        },
        '@media (max-width: 300px)': {
            fontSize: '20px',
            width: '110px',
            height: '40px',
            marginTop: '15px'
        },
    }
})

const useAppointmentCardStyles = createUseStyles({
    appointmentCard: {
        margin: '20px',
        padding: '10px',
        background: 'radial-gradient(ellipse at top, rgba(64, 69, 178, .92), transparent), radial-gradient(ellipse at bottom, rgba(56, 17, 17, 1), transparent)',
        textShadow: '#e5d7d7 1px 0px 5px',
        textAlign: 'start',
        color: 'white',
        borderRadius: '10px',
        filter: 'drop-shadow(2px 2px 1px #443356)',
        'WebkitUserSelect' : 'none', /* Safari */        
        'MozUserSelect': 'none', /* Firefox */
        'msUserSelect': 'none', /* IE10+/Edge */
        userSelect: 'none',
        '@media (max-width: 920px)': {
            //fontSize: '36px'
        }
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
            <h1 className={classes.viewPrompt}>Please review your session details:</h1>
            <AppointmentCard session={session} connection={connection} date={schedule.date} time={schedule.time} useStyles={useAppointmentCardStyles}/>
            {user === null && 
                <>
                    <h3 className={classes.h3}>Sign in to continue finalizing your appointment:</h3>
                    {authFlow === 'sign-up' && <p className={classes.p} onClick={(e) => {e.preventDefault(); setAuthFlow('log-in')}}>I already have an account!</p>}
                    {authFlow === 'log-in' && <p className={classes.p} onClick={(e) => {e.preventDefault(); setAuthFlow('sign-up')}}>I don't have an account yet.</p>}
                    <Authentication authFlow={authFlow} />
                    
                </>}
            {(user != null && sessionConfirmed === false) && 
                <div>
                    <h2>Thank you for allowing me to join you on your healing journey, {formatDisplayName(user)}!</h2>
                    <h4>Specifying your payment method is the final step to securing your appointment. If your session will take place in person you can choose to pay at the time of your appointment, otherwise you will receive an invoice via email with a link to Square's secure online payment form to pay with your Credit/Debit card. If you would like to pay via PayPal, please contact me and we will make those arrangements.</h4>
                    <div className={classes.paymentSelect}>
                        <h3>Select a payment method:</h3>
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