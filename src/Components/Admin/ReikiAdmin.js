import React, { useState, useEffect } from 'react'

import {DateTime, Interval, Info} from 'luxon'


const ReikiAdmin = () => {

    const [disabledDates, setDisabledDates] = useState(null)
    const [activeMgr, setActiveMgr] = useState('')
    const [practitioners, addPractitioner] = useState([])
    

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

    
    
    // const fetchAppointments = () => {
    //     const appointment = 
    //     getAppointments(appointment)
        
    // }
        
    

    return (
        <div>
            <h2>Reiki Admin</h2>

            <h3 onClick={onMgrClick}>Set Appointment Availability</h3>

            {DateTime.local().toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS)}

            <h3 onClick={onMgrClick}>Manage Appointment Types</h3>
            <h3 onClick={onMgrClick}>Manage Practitioners</h3>
            {activeMgr === 'practitioners' ? 
                <div>
                    <button>Add A Practitioner</button>
                </div> : null}
        </div>
    )
}

export default ReikiAdmin