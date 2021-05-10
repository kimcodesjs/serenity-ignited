import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'

import {DateTime, Interval, Info} from 'luxon'


const ReikiAdmin = () => {

    const [disabledDates, setDisabledDates] = useState(null)
    const [practitioners, addPractitioner] = useState([])
    
    const getDisabledDates = ({activeStartDate, date, view }) => {
        if (date.getDay() === 0) {
            return true
        } else if (date.getDay() === 1) {
            return true 
        }
    }
    
    
    return (
        <div>
            <h2>Serenity In Healing</h2>
            <Calendar />
            <h3>Set Appointment Availability</h3>
            <h3>Manage Appointment Types</h3>
            <h3>Manage Practitioners</h3>
        </div>
    )
}

export default ReikiAdmin