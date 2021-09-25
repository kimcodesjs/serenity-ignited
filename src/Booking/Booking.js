import React, { useState, useEffect } from 'react'
import { createUseStyles } from 'react-jss'
import Session from './Session'
import Connection from './Connection'
import Scheduler from './Scheduler'
import OrderConfirmation from './OrderConfirmation'

const useStyles = createUseStyles({
    span: {
        marginRight: '10px',
        '-webkit-box-shadow': '0px 5px 5px #b7d9e9',
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

    const [session, setSession] = useState('')
    const [connection, setConnection] = useState('')
    const [schedule, setSchedule] = useState(null)
    const [view, updateView] = useState(1)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (error !== null) {
            setError(null)
        }
    }, [session, connection])

    let classes = useStyles()

    const onClickSession = () => {
        updateView(1)
    }

    const onClickConnection = () => {
        if (session === '') {
            setError('Please select a healing session.')
        } else {
            updateView(2)
        }  
    }

    const onClickSchedule = () => {
        if (session === '' || connection === '') {
            setError('Please select a healing session and connection.')
        } else {
            updateView(3)
        }
    }

    return (
        <>
            <h2>Your Session</h2>
            <span className={session === '' ? classes.span : classes.spanCompleted} onClick={onClickSession}>Session: {session === '' ? '...' : session}</span>
            <span className={connection === '' ? classes.span : classes.spanCompleted} onClick={onClickConnection}>Connection: {connection === '' ? '...' : connection}</span>
            <span className={schedule === null ? classes.span : classes.spanCompleted} onClick={onClickSchedule}>Date/Time: {schedule === null ? '...' : schedule}</span>
            {error ? <span>{error}</span> : null}
            
            {view === 1 ? <Session setSession={setSession} updateView={updateView} setError={setError} /> : null}
            {view === 2 ? <Connection setConnection={setConnection} updateView={updateView} session={session} setError={setError} /> : null}
            {view === 3 ? <Scheduler setSchedule={setSchedule} /> : null}
            {view === 4 ? <OrderConfirmation session={session} connection={connection} schedule={schedule}/> : null}
            
        </>
    )
}

export default Booking