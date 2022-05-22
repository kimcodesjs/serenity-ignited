import React, { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import Calendar from 'react-calendar'
import { DateTime, Duration, Interval } from 'luxon'

const useStyles = createUseStyles({
    viewContainer: {
        height: '90vh',
        maxWidth: '700px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        overflowX: 'hidden',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    viewPrompt: {
        marginBottom: '0',
        '@media (max-width: 920px)': {
            fontSize: '24px',
            marginLeft: '70px',
            marginRight: '70px'
        }
    },
    container: {
        width: '100%',
        //justifyContent: 'center',
        display: 'inline-flex',
        '@media (max-width: 920px)': {
            flexDirection: 'column'
        }
        
    },
    timeSlots: {
        height: '125px',
        width: '300px',
        maxWidth: '80%',
        fontWeight: 'bold',
        color: 'white',
        textShadow: '#e5d7d7 1px 0px 5px',
        background: 'radial-gradient(ellipse at top, rgba(64, 69, 178, .92), transparent), radial-gradient(ellipse at bottom, rgba(56, 17, 17, 1), transparent)',
        borderRadius: '10px',
        filter: 'drop-shadow(2px 2px 1px #443356)',
        marginBottom: '20px',
        
    },
    date: {
        '@media (max-width: 920px)': {
            fontSize: '24px'
        }
    },
    timePicker: {
        fontFamily: 'inherit',
        borderRadius: '10px',
        border: 'none',
        padding: '5px',
        '&:focus': {
            border: 'solid 1px #443356'
        }
    }
    
})
const Scheduler = ({ setSchedule, duration }) => {

    const classes = useStyles()

    const [activeDate, setActiveDate] = useState(DateTime.now())
    const [activeTimeslot, setActiveTimeslot] = useState(null)
    const [availableTimeslots, setTimeslots] = useState([])

    useEffect(() => {
        // Existing bookings to be fetched from database
        let currentBookings = [
            Interval.fromDateTimes(DateTime.fromISO("2021-11-19T18:30:00"), DateTime.fromISO("2021-11-19T18:45:00").plus({ minutes: 15 })),
            Interval.fromDateTimes(DateTime.fromISO("2021-11-19T19:30:00"), DateTime.fromISO("2021-11-19T19:45:00").plus({ minutes: 15 }))
            // 
            // 
        ]
        // Working hours to be fetched from database
        let workingHours = Interval.fromDateTimes(activeDate.set({hour: 18, minute: 0, second: 0}), activeDate.set({hour: 21, minute:0, second: 0}))
        
        createTimeSlots(duration, currentBookings, workingHours)

    }, [activeDate])
    
    useEffect(() => {
        activeTimeslot && setSchedule({
            date: activeDate,
            time: activeTimeslot
        })
    }, [activeDate, activeTimeslot])

    // createTimeSlots 
    const createTimeSlots = (duration, bookings, workingHours) => {
        const sessionLength = Duration.fromObject(duration)
        const timeslots = workingHours.splitBy(sessionLength)
        const filteredTimeslots = []
        for(let i=0;i<timeslots.length;i++){
            for(let j=0;j<bookings.length;j++){
                if (timeslots[i].overlaps(bookings[j])) {
                    break;   
                }
                else {
                    if(j === bookings.length -1){
                        filteredTimeslots.push(timeslots[i]);
                    }
                }
            }
        }
        console.log('new timeslots generated')
        setTimeslots(filteredTimeslots)
    }

    const updateActiveDate = (value) => {
        setActiveDate(DateTime.fromJSDate(value))
    }

    return (
        <div className={classes.viewContainer}>
            <h1 className={classes.viewPrompt}>When would you like to receive your healing?</h1>
            <br />
            <div className={classes.timeSlots}> 
                    <h2 className={classes.date}>{activeDate.toLocaleString(DateTime.DATE_HUGE)}</h2>

                    <select onChange={(e) => {e.preventDefault; setActiveTimeslot(Interval.fromISO(e.target.value))}} defaultValue='default' className={classes.timePicker}>
                        <option disabled hidden value='default'>Please select a timeslot.</option>
                        {
                            availableTimeslots.map((timeslot, index) => {
                                console.log('new timeslot mapped')
                                return (
                                    <option key={index} value={timeslot.toISO()}>
                                        {timeslot.start.toLocaleString(DateTime.TIME_SIMPLE)} - {timeslot.end.toLocaleString(DateTime.TIME_SIMPLE)}
                                    </option>
                                )
                            })    
                        }
                    </select>
                </div>
                <Calendar
                    calendarType='US'
                    onChange={updateActiveDate}
                    minDate={new Date()}
                />               
        </div>
    )
}

export default Scheduler