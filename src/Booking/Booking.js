import React, { useState, useEffect } from 'react'
import { createUseStyles } from 'react-jss'
import { Transition, SwitchTransition } from 'react-transition-group'
import BookingHeader from './Header/BookingHeader'
import Session from './Views/Session'
import Connection from './Views/Connection'
import Scheduler from './Views/Scheduler'
import SessionConfirmation from './Views/SessionConfirmation'

const useStyles = createUseStyles({
    bookingContent: {
        background: 'url("Chakra Mandala.png") bottom left no-repeat',
        backgroundSize: '32%',
        '@media (max-width: 720px)': {
            backgroundSize: '75%',
            backgroundPosition: 'bottom'
        }
    }
})

const Booking = ({ user, setUser }) => {

    const [session, setSession] = useState(null)
    const [connection, setConnection] = useState(null)
    const [schedule, setSchedule] = useState(null)
    const [allowNextView, setAllowStatus] = useState(false)
    const [view, updateView] = useState(null)

    const classes = useStyles()

    useEffect(() => {
        if (view === 1) {
            session === null ? setAllowStatus(false) : setAllowStatus(true)
        }
        if (view === 2) {
            connection === null ? setAllowStatus(false) : setAllowStatus(true)
        }
        if (view === 3) {
            schedule === null ? setAllowStatus(false) : setAllowStatus(true)
        }
        if (view === 4) {
            setAllowStatus(false)
        }
    }, [session, connection, schedule, view])

    // reset connection and schedule selections if session selection changes to prevent accidental booking w/ invalid selections
    useEffect(() => {
        connection !== null && setConnection(null)
        schedule !== null && setSchedule(null)
    }, [session])

    return (
        <>
            <BookingHeader updateView={updateView} view={view} allowNextView={allowNextView}/>
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