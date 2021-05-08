import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import DateTime from 'luxon/src/datetime.js'
import Interval from 'luxon/src/interval.js'

const ReikiAdmin = () => {

    const [disabledDates, setDisabledDates] = useState(null)
    const [activeMgr, setActiveMgr] = useState('')
    const [appointments, getAppointments] = useState({
        client: 'John Doe',
        practitioner: 'Becky Kappell',
        type: 'sample',
        // time: Interval() -> see Luxon tuts saved in bookmark
    })

    // useEffect(() => {
    //     fetchAppointments()
    // }),[]

    const onMgrClick = (e) => {
        if (e.target.innerHTML === 'Set Appointment Availability') {
            setActiveMgr('availability')
        } else if (e.target.innerHTML === 'Manage Appointment Types') {
            setActiveMgr('types')
        } else if (e.target.innerHTML === 'ManagePractitioners') {
            setActiveMgr('practitioners')
        }
    }

    const getDisabledDates = ({activeStartDate, date, view }) => {
        if (date.getDay() === 0) {
            return true
        } else if (date.getDay() === 1) {
            return true 
        }
    }
    
    // const fetchAppointments = () => {
    //     const appointment = 
    //     getAppointments(appointment)
        
    // }
        
    

    return (
        <div>
            <h2>Reiki Admin</h2>

            <Calendar 
                tileDisabled={getDisabledDates}/>

            <h3>Upcoming Appointments</h3>
            {appointments ? 
                <div>
                    <p>{appointments.client}, {appointments.practitioner}, {appointments.type} </p>
                </div> : null}
            <br />
            <h3 onClick={onMgrClick}>Set Appointment Availability</h3>
            {activeMgr === 'availability' ? <Calendar /> : null}
            <h3 onClick={onMgrClick}>Manage Appointment Types</h3>
            <h3 onClick={onMgrClick}>Manage Practitioners</h3>
        </div>
    )
}

export default ReikiAdmin