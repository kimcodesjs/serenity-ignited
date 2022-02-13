import React, { useState, useEffect } from 'react'
import AppointmentCard from './Booking/AppointmentCard'
import { db } from './index'
import { collection, query, where, getdocs, getDocs } from 'firebase/firestore'
import { useParams } from 'react-router-dom'
import { DateTime } from 'luxon'
import { Interval } from 'luxon'


const MySessions = () => {
    
    const [userAppointments, setUserAppointments] = useState([])

    let { userID } = useParams()
    useEffect(async () => {
        let appointments = []   
        await getDocs(query(collection(db, 'Appointments'), where('userID', '==', `${userID}`))).then((results) => {
            results.forEach((doc) => {
                appointments.push(doc.data())
            })
            setUserAppointments(appointments)
        })
    },[])
    return (
        <div>
            <h2>My Sessions...</h2>
            {userAppointments.length > 0 && userAppointments.map((appointment) => {
                return <AppointmentCard 
                            key={userAppointments.indexOf(appointment)} 
                            session={appointment.session} connection={appointment.connection} 
                            date={DateTime.fromISO(appointment.startISO)} 
                            time={Interval.fromISO(appointment.timeISO)}
                        />
            })}
        </div>
    )
}

export default MySessions