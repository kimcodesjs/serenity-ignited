import React, { useState, useEffect } from 'react'
import BookingHeader from './BookingHeader'
import Session from './Session'
import Connection from './Connection'
import Scheduler from './Scheduler'
import SessionConfirmation from './SessionConfirmation'

const Booking = ({ user, setUser }) => {

    const [session, setSession] = useState(null)
    const [connection, setConnection] = useState(null)
    const [schedule, setSchedule] = useState(null)
    const [selectionMade, setSelectionStatus] = useState(false)
    const [view, updateView] = useState(null)

    useEffect(() => {
        if (view === 1) {
            session === null ? setSelectionStatus(false) : setSelectionStatus(true)
        }
        if (view === 2) {
            connection === null ? setSelectionStatus(false) : setSelectionStatus(true)
        }
        if (view === 3) {
            schedule === null ? setSelectionStatus(false) : setSelectionStatus(true)
        }
    }, [session, connection, schedule, view])

    // reset connection and schedule selections if session changes to prevent accidental booking w/ invalid selections
    useEffect(() => {
        connection !== null && setConnection(null)
        schedule !== null && setSchedule(null)
    }, [session])

    return (
        <>
            <BookingHeader updateView={updateView} view={view} allowNextView={selectionMade}/>
            {view === 1 && <Session setSession={setSession} session={session} />}
            {view === 2 && <Connection setConnection={setConnection} connection={connection} inPersonOnly={session.inPersonOnly} />}
            {view === 3 && <Scheduler setSchedule={setSchedule} duration={session.duration}/>}
            {view === 4 && <SessionConfirmation user={user} session={session} connection={connection.id} schedule={schedule}/>}
        </>
    )
}

export default Booking