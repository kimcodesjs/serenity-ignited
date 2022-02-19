import React, { useState, useEffect } from 'react'
import { createUseStyles } from 'react-jss'
import Session from './Session'
import Connection from './Connection'
import Scheduler from './Scheduler'
import SessionConfirmation from './SessionConfirmation'

const useStyles = createUseStyles({
    bookingContainer: {
        // backgroundImage: 'linear-gradient(to bottom, rgba(62, 109, 216, .62), rgba(60, 23, 89, .0)),url("pastel-sky.jpg")',
        // backgroundAttachment: 'fixed',
        // backgroundSize: 'cover',
        // backgroundRepeat: 'no-repeat',
        // backgroundPosition: 'left 35% bottom 45%',
        // width: '100%',
        // height: '100%'
        background: 'radial-gradient(ellipse at top, rgba(232, 232, 185, .92), transparent), radial-gradient(ellipse at bottom, rgba(232, 232, 185, .92), transparent), url("/angel wings chakras 1.jpg")',
        backgroundAttachment: 'fixed',
        paddingTop: '50px',
        width: '100%',
        minHeight: window.screen.availHeight+60
    },
    bookingContent: {
        width: '90%',
        maxWidth: '960px',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '10px'
    },
    h1: {
        margin: 0,
        paddingTop: '15px',
        fontFamily: "'Over the Rainbow', cursive",
    },
    sessionBuilder: {
        borderRadius: '10px',
        height: '100%',
        maxWidth: '900px',
        margin: '0',
        border: '15px #32a1ce',
        // backgroundImage: 'linear-gradient(to bottom, rgba(57, 65, 96, .92), rgba(60, 23, 89, .0))',
        // backgroundAttachment: 'fixed',
        // backgroundSize: 'fill',
        // backgroundRepeat: 'no-repeat',
        // backgroundPosition: 'center',
    },
    // background: {
    //     height: '740px',
    //     width: '100%',
    //     padding: '30px',
        
    //     overflow: 'hidden'
    // },
    h2: {
        marginBottom: '5px',
        marginTop: '0px',
        textShadow: '#e5d7d7 1px 0px 5px',
        fontSize: '35px'
    },
    progressBubble: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        width: '40px',
        height: '40px',
        background: '#99bac9',
        border: 'solid 2px rgba(56, 17, 17, .7)',
        borderRadius: '50%',
        marginLeft: '10px',
        userSelect: 'none',
        cursor: 'pointer',
        filter: 'drop-shadow(2px 2px 1px #443356)',
    },
    progressActive: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        width: '40px',
        height: '40px',
        background: '#aa99c9',
        border: 'solid 2px rgba(56, 17, 17, .7)',
        borderRadius: '50%',
        marginLeft: '10px',
        userSelect: 'none',
        cursor: 'pointer',
        filter: 'drop-shadow(2px 2px 1px #443356)',
    }
})

console.log(window.screen.availHeight+60)

const Booking = ({ user, setUser }) => {
    
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

    

    const onClick = (e) => {

        if (e.target.innerHTML == 1) {
            setConnection(null)
            setSchedule(null)
            updateView(1)
        } else if (e.target.innerHTML == 2) {
            if (session === null) {
                setError('Please select a healing session.')
            } else {
                setSchedule(null)
                updateView(2)
            } 
        } else if (e.target.innerHTML == 3) {
            if (session === null || connection === null) {
                setError('Please select a healing session and connection.')
            } else {
                updateView(3)
            }
        } else if (e.target.innerHTML == 4) {
            if (session === null || connection === null || schedule === null) {
                setError('Please select a healing session, connection, and date/time for your session.')
            } else {
                updateView(4)
            }
        }
    }

    return (
        <div className={classes.bookingContainer}>
            <div className={classes.bookingContent}>
                <h1 className={classes.h1}>Let's create your healing session!</h1>
                <p>If you are new to energy healing, take a look at more information on Reiki and Access Consciousness.</p>
                <p></p>
                <p>The concept of being able to receive healing energy when we are not even physically together is hard to wrap your mind around. A simple way to illustrate how it works is to think of how a radio brings you music. The majority of us do not understand exactly how radio waves end up playing our favorite tunes, but the music is there...blasting through our speakers every time we turn the radio on! Reiki works in a similar way, so you can rest assured that even though we are not physically together, the energies will make their way to you just like your favorite tunes.</p>
                <p>If you are considering an Access Bars session, please note that remote options are not available. This energy healing modality requires light physical touch. There is more information on this on Access Bars page.</p>
                <p>From here, I'll let you go ahead and get started selecting your appointment. If you hit any snags during the booking process, or have any questions along the way, please don't hesitate to reach out.</p>
                
            
                <div className={classes.sessionBuilder}>
                    <h2 className={classes.h2}>Your Session</h2>
                    <div className={view === 1 ? classes.progressActive : classes.progressBubble} onClick={onClick}>1</div>
                    <div className={view === 2 ? classes.progressActive : classes.progressBubble} onClick={onClick}>2</div>
                    <div className={view === 3 ? classes.progressActive : classes.progressBubble} onClick={onClick}>3</div>
                    <div className={view === 4 ? classes.progressActive : classes.progressBubble} onClick={onClick}>4</div>
                    <br />
                    <div>{error ? <span>{error}</span> : null}</div>
                        
                    {view === 1 && <Session setSession={setSession} updateView={updateView} setError={setError}/>}
                    {view === 2 && <Connection setConnection={setConnection} updateView={updateView} session={session.id} setError={setError} />}
                    {view === 3 && <Scheduler setSchedule={setSchedule} updateView={updateView} duration={session.duration}/>}
                    {view === 4 && <SessionConfirmation user={user} session={session} connection={connection.id} schedule={schedule}/>}

                </div>
            </div>
        </div>
    )
}
/*
    <div className={session === null ? classes.span : classes.spanCompleted} onClick={onClickSession}>Session: {session === null ? '...' : session.id}</div>
    <div className={connection === null ? classes.span : classes.spanCompleted} onClick={onClickConnection}>Connection: {connection === null ? '...' : connection.id}</div>
    <div className={schedule === null ? classes.span : classes.spanCompleted} onClick={onClickSchedule}>Date/Time: {schedule === null ? '...' : schedule.date.toLocaleString(DateTime.DATE_HUGE)+' at '+schedule.time.start.toLocaleString(DateTime.TIME_SIMPLE)}</div>
*/
export default Booking