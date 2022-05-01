import React, { useState, useEffect } from 'react'
import { createUseStyles } from 'react-jss'
import Session from './Session'
import Connection from './Connection'
import Scheduler from './Scheduler'
import SessionConfirmation from './SessionConfirmation'

const useStyles = createUseStyles({
    wrapper: {
        width: '100vw',
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        perspective: '10px'
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        zIndex: 3,
        background: 'linear-gradient(to bottom, rgba(56, 17, 17, .72), rgba(60, 23, 89, .0))'
       
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '110%',
        width: '100%',
        objectFit: 'cover',
        zIndex: '-2'
    },
    foreground: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '110%',
        width: '100%',
        objectFit: 'cover',
        zIndex: '-1',
        opacity: '.6',
    },
    bookingContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '80%',
        maxWidth: '960px',
        fontSize: '1.5rem',
        color: 'white',
        textShadow: '#381111 10px 10px 5px',
    },
    h1: {
        margin: 0,
        fontFamily: "'Over the Rainbow', cursive",
        fontSize: '3rem',
        color: 'white',
        textShadow: '#381111 10px 10px 5px',
        //filter: 'drop-shadow(10px 10px 1px #443356)',
        padding: '30px',
    },
    sessionBuilder: {
        //height: '100%',
        width: '100vw',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingTop: '100px',
        border: '15px #32a1ce',
        background: 'radial-gradient(ellipse at top, rgba(232, 232, 185, 1), white)',
        '-webkit-mask-image': 'linear-gradient(transparent, black 10%)',
        maskImage: 'linear-gradient(transparent, black 10%)',
    },
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



const Booking = ({ user, setUser }) => {
    
    let classes = useStyles()

    window.addEventListener('scroll', (e) => {
        const foreground = document.getElementById('foreground')
        const background = document.getElementById('background')
        const greeting = document.getElementById('greeting')
        const text = document.getElementById('text')
        let value = window.scrollY

        background.style.top = value * .25 + 'px'
        foreground.style.top = value * .5 + 'px'
        greeting.style.textShadow = `#381111 10px ${10 - value*.03}px 5px`
        text.style.textShadow = `#381111 10px ${10 - value*.03}px 5px`
    })
    const [session, setSession] = useState(null)
    const [connection, setConnection] = useState(null)
    const [schedule, setSchedule] = useState(null)
    const [view, updateView] = useState(1)
    const [error, setError] = useState(null)

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
        <>
            <div className={classes.header}>
                <img src='/2.png' className={classes.background} id='background'/>
                <img src='/3.png' className={classes.foreground} id='foreground'/>
                <h1 className={classes.h1} id='greeting'>Let's create your healing session!</h1>
                <div className={classes.bookingContent} >        
                    <p id='text'>If you are new to energy healing, take a look at more information on Reiki and Access Consciousness. Please note that remote options are not available for Access Consciousness sessions. This energy healing modality requires light physical touch. There is more information on this on Access Bars page.</p>
                </div>
                
            </div>
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
        </>
    )
}
/*
    <div className={session === null ? classes.span : classes.spanCompleted} onClick={onClickSession}>Session: {session === null ? '...' : session.id}</div>
    <div className={connection === null ? classes.span : classes.spanCompleted} onClick={onClickConnection}>Connection: {connection === null ? '...' : connection.id}</div>
    <div className={schedule === null ? classes.span : classes.spanCompleted} onClick={onClickSchedule}>Date/Time: {schedule === null ? '...' : schedule.date.toLocaleString(DateTime.DATE_HUGE)+' at '+schedule.time.start.toLocaleString(DateTime.TIME_SIMPLE)}</div>
*/
export default Booking