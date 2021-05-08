import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const Overview = () => {

    const [appointments, getAppointments] = useState({
        client: 'John Doe',
        practitioner: 'Becky Kappell',
        type: 'sample',
        // time: Interval() -> see Luxon tuts saved in bookmark
    })

    const getDisabledDates = ({activeStartDate, date, view }) => {
        if (date.getDay() === 0) {
            return true
        } else if (date.getDay() === 1) {
            return true 
        }
    }

    return (
        <div>
            <h2>Overview</h2>
            <h3>Upcoming Appointments</h3>
            <Calendar 
                tileDisabled={getDisabledDates}/>
            {appointments ? 
                <div>
                    <p>{appointments.client}, {appointments.practitioner}, {appointments.type} </p>
                </div> : null}
            <br />
            <p>Sales Data</p>

        </div>
    )

}

export default Overview