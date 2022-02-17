import React, { useState, useEffect } from 'react'
import AppointmentCard from './Booking/AppointmentCard'
import { db } from './index'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { useParams } from 'react-router-dom'
import { DateTime, Interval } from 'luxon'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    mySessions: {
        //backgroundImage: 'linear-gradient(to right, transparent, rgba(232, 232, 185, .92) 10%, rgba(232, 232, 185, .92) 90%, transparent),url("/angel wings chakras 1.jpg")',
        background: 'radial-gradient(ellipse at top, rgba(232, 232, 185, .92), transparent), radial-gradient(ellipse at bottom, rgba(232, 232, 185, .92), transparent), url("/angel wings chakras 1.jpg")',
        backgroundAttachment: 'fixed',
        paddingTop: '50px',
        width: '100%',
        height: '100%'
    },
    h2: {
        fontFamily: "'Over the Rainbow', cursive",
        fontSize: '40px',
        //textAlign: 'center',
        marginTop: 0,
        marginLeft: '10%',
        //marginRight: 'auto',
        width: '400px'
    },
    apptCardContainer: {
        display: 'inline-flex',
        flexFlow: 'row wrap',
        width: '80%',
        marginLeft: '10%',
        marginRight: '10%'
    }
})

const useAppointmentCardStyles = createUseStyles({
    appointmentCard: {
        margin: '20px',
        width: '350px',
        padding: '10px',
        background: 'radial-gradient(ellipse at top, rgba(130, 150, 188, .7), transparent), radial-gradient(ellipse at bottom, rgba(130, 150, 188, .7), transparent)',
        textShadow: '#e5d7d7 1px 0px 5px',
        filter: 'drop-shadow(2px 2px 1px #443356)',
        userSelect: 'none'
    },
    h4: {
        margin: 0
    },
})
const MySessions = () => {
    
    const [userAppointments, setUserAppointments] = useState([])
    const classes = useStyles()

    let { userID } = useParams()
    useEffect(async () => {
        let appointments = []   
        await getDocs(query(collection(db, 'Appointments'), where('userID', '==', `${userID}`), orderBy('date'))).then((results) => {
            results.forEach((doc) => {
                appointments.push(doc.data())
            })
            setUserAppointments(appointments)
        })
    },[])
    
    return (
        <div className={classes.mySessions}>
            <h2 className={classes.h2}>My Sessions</h2>
            <div className={classes.apptCardContainer}>
                {userAppointments.length > 0 && userAppointments.map((appointment) => {
                    return <AppointmentCard 
                                key={userAppointments.indexOf(appointment)} 
                                session={appointment.session} connection={appointment.connection} 
                                date={DateTime.fromISO(appointment.date)} 
                                time={Interval.fromISO(appointment.timeISO)}
                                useStyles={useAppointmentCardStyles}
                                
                            />
                })}
            </div>
        </div>
    )
}

export default MySessions