import React, { useState } from 'react'
import Modality from './Modality'
import Connection from './Connection'
import Scheduler from './Scheduler'
import PaymentForm from './PaymentForm'

const Booking = () => {
    const [modality, setModality] = useState('')
    const [connection, setConnection] = useState('')
    const [schedule, setSchedule] = useState('')
    const [view, updateView] = useState(1)

    
    return (
        <>
            <h2>Your Session</h2>
            <span>{modality}</span>
            <span>{connection}</span>
            <span>{schedule}</span>
            
            {view === 1 ? <Modality setModality={setModality} updateView={updateView}/> : null}
            {view === 2 ? <Connection setConnection={setConnection} updateView={updateView} modality={modality}/> : null}
            {view === 3 ? <Scheduler /> : null}
            {view === 4 ? <PaymentForm /> : null}
            
        </>
    )
}

export default Booking