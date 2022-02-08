import React, { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import Calendar from 'react-calendar'
import { DateTime, Duration, Interval } from 'luxon'

const useStyles = createUseStyles({
    container: {
        width: '100%',
        //justifyContent: 'center',
        display: 'inline-flex',
        '@media (max-width: 920px)': {
            flexDirection: 'column'
        }
    },
    timeSlots: {
        paddingLeft: '25px',
        fontWeight: 'bold'
    },
    timePicker: {
        fontFamily: 'inherit'
    },
    continueEnabled: {
        marginRight: '25%',
        marginTop: '20px',
        width: '85px',
        textAlign: 'center',
        userSelect: 'none',
        cursor: 'pointer',
        background: 'radial-gradient(ellipse at top, rgba(130, 150, 188, .7), transparent), radial-gradient(ellipse at bottom, rgba(130, 150, 188, .7), transparent)',
        textShadow: '#e5d7d7 1px 0px 5px',
        filter: 'drop-shadow(2px 2px 1px #443356)',
        borderRadius: '10px',
    },
    continueDisabled: {
        marginRight: '25%',
        marginTop: '20px',
        width: '85px',
        textAlign: 'center',
        userSelect: 'none',
        background: 'radial-gradient(ellipse at top, rgba(94, 94, 94, .7), transparent), radial-gradient(ellipse at bottom, rgba(100, 100, 100, .7), transparent)',
        color: '#b2b2b2',
        textShadow: '#e5d7d7 1px 0px 5px',
        filter: 'drop-shadow(2px 2px 1px #443356)',
        borderRadius: '10px',
    }
    
})
const Scheduler = ({ setSchedule, updateView, duration }) => {

    let classes = useStyles()

    let [activeDate, setActiveDate] = useState(DateTime.now())
    let [activeTimeslot, setActiveTimeslot] = useState(null)
    let [availableTimeslots, setTimeslots] = useState([])

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
    
    const updateActiveDate = (value) => {
        setActiveDate(DateTime.fromJSDate(value))
    }
    
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
        
        setTimeslots(filteredTimeslots)
    }

    const onConfirm = () => {
        if (activeTimeslot) {
            setSchedule({
                date: activeDate,
                time: activeTimeslot
            })
            updateView(4)
        }
    }

    // how do I get Timeslots to reset when activeDate changes? 
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

                    <select onChange={(e) => {e.preventDefault; setActiveTimeslot(Interval.fromISO(e.target.value))}} defaultValue='default' className={classes.timePicker}>
                        <option disabled hidden value='default'>Please select a timeslot.</option>
                        {
                            availableTimeslots.map((timeslot, index) => {
                                return (
                                    <option key={index} value={timeslot.toISO()}>
                                        {timeslot.start.toLocaleString(DateTime.TIME_SIMPLE)} - {timeslot.end.toLocaleString(DateTime.TIME_SIMPLE)}
                                    </option>
                                )
                            })    
                        }
                    </select>
                    <br />
                    <div className={activeTimeslot ? classes.continueEnabled : classes.continueDisabled} onClick={onConfirm}>Continue</div>
                </div>             
            </div>
        </>
    )
}

export default Scheduler