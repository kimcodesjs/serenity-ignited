import React, { useState, useEffect } from 'react'
import AppointmentCard from './Booking/AppointmentCard'
import { db } from './index'
import { collection, query, where, getDocs, orderBy, deleteDoc, doc } from 'firebase/firestore'
import { useParams } from 'react-router-dom'
import { DateTime, Interval } from 'luxon'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    mySessions: {
        background: 'radial-gradient(ellipse at top, rgba(232, 232, 185, .92), transparent), radial-gradient(ellipse at bottom, rgba(232, 232, 185, .92), transparent), url("/angel wings chakras 1.jpg")',
        backgroundAttachment: 'fixed',
        paddingTop: '50px',
        width: '100%',
        minHeight: '100%'
    },
    h2: {
        fontFamily: "'Over the Rainbow', cursive",
        fontSize: '40px',
        marginTop: 0,
        marginLeft: '10%',
        width: '400px'
    },
    mySessionsContnent: {
        display: 'inline-flex',
        flexDirection: 'column',
        width: '80%',
        marginLeft: '10%',
        marginRight: '10%'
    },
    apptCardContainer: {
        display: 'inline-flex',
        flexFlow: 'row wrap',
        width: '50%',
        
    },
    apptEditContainer: {
        width: '50%',
        background: 'radial-gradient(ellipse at top, rgba(130, 150, 188, .7), transparent), radial-gradient(ellipse at bottom, rgba(130, 150, 188, .7), transparent)', 
    },
    
})

const useAppointmentCardStyles = createUseStyles({
    appointmentCard: {
        margin: '20px',
        width: '400px',
        padding: '10px',
        background: 'radial-gradient(ellipse at top, rgba(130, 150, 188, .7), transparent), radial-gradient(ellipse at bottom, rgba(130, 150, 188, .7), transparent)',
        textShadow: '#e5d7d7 1px 0px 5px',
        filter: 'drop-shadow(2px 2px 1px #443356)',
        userSelect: 'none'
    },
    h4: {
        margin: 0
    },
    button: {
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
    }
})
const MySessions = () => {
    
    const [userAppointments, setUserAppointments] = useState([])
    const classes = useStyles()

    let { userID } = useParams()

    
    useEffect(async () => {
        let appointments = []   
        await getDocs(query(collection(db, 'Appointments'), where('userID', '==', `${userID}`), orderBy('date'))).then((results) => {
            results.forEach((doc) => {
                appointments.push({
                    data: doc.data(),
                    id: doc.id
                })
            })
            setUserAppointments(appointments)
        })
    },[])


    const onCancel = async (appointmentID) => {
        await deleteDoc(doc(db, 'Appointments', appointmentID)).then(() => {
            setUserAppointments(userAppointments.filter((appointment) => {
                if (appointment.id != appointmentID) return appointment
            }))
        })
    }

    return (
        <div className={classes.mySessions}>
            <h2 className={classes.h2}>My Sessions</h2>
            <div className={classes.mySessionsContnent}>
                <div className={classes.apptCardContainer}>
                    {userAppointments.length > 0 && userAppointments.map((appointment) => {
                        return <AppointmentCard 
                                    key={appointment.id} 
                                    session={appointment.data.session} connection={appointment.data.connection} 
                                    date={DateTime.fromISO(appointment.data.date)} 
                                    time={Interval.fromISO(appointment.data.timeISO)}
                                    useStyles={useAppointmentCardStyles}
                                    onCancel={(e) => {e.preventDefault(); onCancel(appointment.id)}}
                                />
                    })}
                </div>
                <div className={classes.apptEditContainer}>
                    
                </div>
            </div>
        </div>
    )
}

export default MySessions