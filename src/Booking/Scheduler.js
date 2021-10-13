import React, { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import Calendar from 'react-calendar'
import { DateTime, Duration } from 'luxon'


// to do - styling calendar? create timeslot picker
const useStyles = createUseStyles({
    container: {
        width: '100%',
        justifyContent: 'center',
        //alignItems: 'center',
        display: 'inline-flex'
    },
    timeSlots: {
        paddingLeft: '10px'
    },
    calendar: {
        
    }
    
})
const Scheduler = ({ setSchedule, session }) => {

    let classes = useStyles()

    let [activeDate, setActiveDate] = useState(null)

    useEffect(() => {
        console.log(activeDate)
        createTimeSlots(activeDate, session)
    }, [activeDate])
    
    const updateActiveDate = (value) => {
        const date = DateTime.fromJSDate(value)
        setActiveDate(date.toLocaleString(DateTime.DATE_HUGE))
    }

    const createTimeSlots = (date, session) => {
        // date parameter should be a luxon DateTime object
        const buffer = Duration.fromObject({ minutes: 15})
        
        // read session type and apply appropriate duration
        // why does this console.log session object and not just session duration? 
        const duration = session.duration
        console.log(buffer, duration)
        
        // generate available time slots based on practitioner availability, including buffer time
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
                    <h3>{activeDate ? activeDate : DateTime.now().toLocaleString(DateTime.DATE_HUGE)}</h3>
                    
                </div>
            </div>
        </>
    )
}
export default Scheduler