import React, { useState, useEffect } from 'react'
import { createUseStyles } from 'react-jss'
import { Transition, SwitchTransition } from 'react-transition-group'
import BookingHeader from './BookingHeader'
import Session from './Session'
import Connection from './Connection'
import Scheduler from './Scheduler'
import SessionConfirmation from './SessionConfirmation'

const useStyles = createUseStyles({
    bookingContent: {
        background: 'url(clouds.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    }
})

const Booking = ({ user, setUser }) => {

    const [session, setSession] = useState(null)
    const [connection, setConnection] = useState(null)
    const [schedule, setSchedule] = useState(null)
    const [selectionMade, setSelectionStatus] = useState(false)
    const [view, updateView] = useState(null)

    const classes = useStyles()

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
            <div className={classes.bookingContent}>
                {view === 1 && <Session setSession={setSession} session={session} />}
                {view === 2 && <Connection setConnection={setConnection} connection={connection} inPersonOnly={session.inPersonOnly}/>}
                {view === 3 && <Scheduler setSchedule={setSchedule} duration={session.duration} />}
                {view === 4 && <SessionConfirmation user={user} session={session} connection={connection.id} schedule={schedule} />}      
            </div>
        </>
    )
}


export default Booking