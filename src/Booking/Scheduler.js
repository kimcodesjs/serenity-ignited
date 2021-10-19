import React, { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import Calendar from 'react-calendar'
import { DateTime, Duration, Interval } from 'luxon'


const useStyles = createUseStyles({
    container: {
        width: '100%',
        justifyContent: 'center',
        display: 'inline-flex'
    },
    timeSlots: {
        paddingLeft: '10px'
    },
    calendar: {
        
    }
    
})
const Scheduler = ({ setSchedule, duration }) => {

    let classes = useStyles()

    let [activeDate, setActiveDate] = useState(DateTime.now())
    let [timeslotsUI, setTimeslotsUI] = useState([])

    useEffect(() => {
        // Existing bookings to be fetched from database
        let currentBookings = [
            Interval.fromDateTimes(DateTime.fromISO("2021-10-18T18:30:00"), DateTime.fromISO("2021-10-18T18:45:00").plus({ minutes: 15 }))
        ]
        // Working hours to be fetched from database
        let workingHours = Interval.fromDateTimes(activeDate.set({hour: 18, minute: 0, second: 0}), activeDate.set({hour: 21, minute:0, second: 0}))
        createTimeSlots(duration, currentBookings, workingHours)

    }, [activeDate])
    
    const updateActiveDate = (value) => {
        setActiveDate(DateTime.fromJSDate(value))
    }

    // createTimeSlots 
    const createTimeSlots = (duration, bookings, workingHours) => {

        const sessionLength = Duration.fromObject(duration)
        
        // generate available time slots based on practitioner availability, including buffer time
        const timeslots = workingHours.splitBy(sessionLength).filter((timeslot) => {
            if (!timeslot.overlaps(bookings[0])) {
                return timeslot
            }
        })
        
        //format timeslots as UI
        const timeslotsUI = timeslots.map((timeslot) => {
            return (<li key={timeslot.start.toString()}>
                {timeslot.start.toLocaleString(DateTime.TIME_SIMPLE)} - {timeslot.end.toLocaleString(DateTime.TIME_SIMPLE)}
            </li>)
        })
        setTimeslotsUI(timeslotsUI)
    }
    return (
        <>
            <h3>When would you like to receive your healing?</h3>
            <br />
            <div className={classes.container}>
                <div className={classes.calendar}>
                    <Calendar
                        calendarType='US'
                        onChange={updateActiveDate}
                        minDate={new Date()}
                    />
                </div>

                <div className={classes.timeSlots}> 
                    <h3>{activeDate.toLocaleString(DateTime.DATE_HUGE)}</h3>
                    <ul>{timeslotsUI}</ul>
                </div>
            </div>
        </>
    )
}
export default Scheduler