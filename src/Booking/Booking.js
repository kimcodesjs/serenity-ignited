import React, { useState, useEffect } from 'react'
import { createUseStyles } from 'react-jss'
import { DateTime, Interval } from 'luxon'
import Session from './Session'
import Connection from './Connection'
import Scheduler from './Scheduler'
import OrderConfirmation from './OrderConfirmation'

const useStyles = createUseStyles({
    span: {
        marginRight: '10px',
        paddingLeft: '10px',
        width: '200px',
        height: '30px',
        display: 'inline-flex',
        alignItems: 'center',
        '-webkit-box-shadow': '5px 5px 5px #b7d9e9',
        '-moz-box-shadow': '0px 1px 1px #b7d9e9',
        '&:hover': {
            '-webkit-box-shadow': '0px 5px 5px #0248ea',
            '-moz-box-shadow': '0px 5px 5px #0248ea'
        },
        cursor: 'pointer',
        userSelect: 'none'

    },
    spanCompleted: {
        marginRight: '10px',
        paddingLeft: '10px',
        width: '200px',
        height: '30px',
        display: 'inline-flex',
        alignItems: 'center',
        '-webkit-box-shadow': '0px 5px 5px #35e044',
        '-moz-box-shadow': '0px 1px 1px #35e044',
        '&:hover': {
            '-webkit-box-shadow': '0px 5px 5px #0248ea',
            '-moz-box-shadow': '0px 5px 5px #0248ea'
        },
        cursor: 'pointer',
        userSelect: 'none'
    }
    
})

const Booking = () => {
    
    let classes = useStyles()

    // session state holds the user selected session, represented by a Session Object
    const [session, setSession] = useState(null)

    // connection state holds the user selected connection (how a client receives the healing), represented by a Connection Object
    const [connection, setConnection] = useState(null)

    // schedule state holds an object containing user selected date & time
    const [schedule, setSchedule] = useState(null)

    // view state holds a number referencing the currently displayed UI
    const [view, updateView] = useState(1)

    // error state holds the message displayed if a user attempts to navigate forward in the booking stage before making necessary selections
    const [error, setError] = useState(null)

    
    // clears an error message once a selection is made, if an error message was set
    useEffect(() => {
        if (error !== null) {
            setError(null)
        }
    }, [session, connection])

    
    // onClickSession clears selections made and navigates back to Session.js
    const onClickSession = () => {
        setConnection(null)
        setSchedule(null)
        updateView(1)
    }

    // if a user has not chosen a session type, onClickConnection sets an error message; 
    // if a session has already been selected, the schedule is cleared and user successfully navigates to Connection.js
    const onClickConnection = () => {
        if (session === null) {
            setError('Please select a healing session.')
        } else {
            setSchedule(null)
            updateView(2)
        }  
    }

    // if user has not selected a session type and connection, error message is displayed
    // if a user has made preceeding selections, user successfully navigates to Schedule.js
    const onClickSchedule = () => {
        if (session === null || connection === null) {
            setError('Please select a healing session and connection.')
        } else {
            updateView(3)
        }
    }

    return (
        <>
            <h2>Your Session</h2>
            <div className={session === null ? classes.span : classes.spanCompleted} onClick={onClickSession}>Session: {session === null ? '...' : session.id}</div>
            <div className={connection === null ? classes.span : classes.spanCompleted} onClick={onClickConnection}>Connection: {connection === null ? '...' : connection.id}</div>
            <div className={schedule === null ? classes.span : classes.spanCompleted} onClick={onClickSchedule}>Date/Time: {schedule === null ? '...' : schedule.date.toLocaleString(DateTime.DATE_HUGE)+' at '+schedule.time.start.toLocaleString(DateTime.TIME_SIMPLE)}</div>
            {error ? <span>{error}</span> : null}
            
            {view === 1 ? <Session setSession={setSession} updateView={updateView} setError={setError}/> : null}
            {view === 2 ? <Connection setConnection={setConnection} updateView={updateView} session={session.id} setError={setError} /> : null}
            {view === 3 ? <Scheduler setSchedule={setSchedule} updateView={updateView} duration={session.duration}/> : null}
            {view === 4 ? <OrderConfirmation session={session} connection={connection} schedule={schedule}/> : null}
            
        </>
    )
}

export default Booking