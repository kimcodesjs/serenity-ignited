import React, { useState, useEffect } from 'react'
import { createUseStyles } from 'react-jss'
import ViewTransition from './Views/ViewTransition'
import BookingHeader from './Header/BookingHeader'
import Session from './Views/Session'
import Connection from './Views/Connection'
import Scheduler from './Views/Scheduler'
import SessionConfirmation from './Views/SessionConfirmation'

const useStyles = createUseStyles({
    bookingContent: {
        paddingBottom: '20px'
    },
    imgRight: {
        position: 'absolute',
        bottom: 0,
        right: 10,
        width: '25%',
        height: 'auto',
        transform: 'rotateY(180deg)',
        zIndex: 3,
        '@media (max-width: 800px)': {
            display: 'none'
        }
    },
    imgLeft: {
        position: 'absolute',
        bottom: 0,
        left: 10,
        width: '25%',
        height: 'auto',
        zIndex: 3,
        '@media (max-width: 800px)': {
            display: 'none'
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
            {view !== null &&
                <div className={classes.bookingContent}>
                    {view === 1 && <Session setSession={setSession} session={session} />}
                    {view === 2 && <Connection setConnection={setConnection} connection={connection} inPersonOnly={session.inPersonOnly}/>}
                    {view === 3 && <Scheduler setSchedule={setSchedule} duration={session.duration} />}
                    {view === 4 && <SessionConfirmation user={user} session={session} connection={connection.id} schedule={schedule} />}    
                </div>
            }
            <img src='Chakra Mandala.png' className={classes.imgLeft} />
            <img src='Chakra Mandala.png' className={classes.imgRight}/>
        </>
    )
}
/*
<ViewTransition isMounted={view === 1 ? true : false}>
    <Session setSession={setSession} session={session} />
</ViewTransition>      
*/

export default Booking