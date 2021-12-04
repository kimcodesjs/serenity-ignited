import React, { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import Calendar from 'react-calendar'
import { DateTime, Duration, Interval } from 'luxon'

const useStyles = createUseStyles({
    container: {
        width: '100%',
        justifyContent: 'center',
        display: 'inline-flex',
        '@media (max-width: 920px)': {
            flexDirection: 'column'
        }
    },
    timeSlots: {
        paddingLeft: '10px',
        fontWeight: 'bold'
    },
    timePicker: {
        fontFamily: "'Martel', serif"
    },
    continueEnabled: {
        marginRight: '25%',
        marginTop: '20px',
        justifyContent: 'center',
        background: 'rgba(58, 37, 48, .75)',
        width: '110px',
        textAlign: 'center',
        color: 'white',
        border: 'solid 2px rgba(56, 17, 17, .7)',
        borderRadius: '10px',
        userSelect: 'none',
        cursor: 'pointer'  
    },
    continueDisabled: {
        marginRight: '25%',
        marginTop: '20px',
        justifyContent: 'center',
        background: 'rgba(130, 150, 188, .7)',
        width: '110px',
        textAlign: 'center',
        border: 'solid 2px rgba(56, 17, 17, .7)',
        borderRadius: '10px',
        userSelect: 'none',
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
        // console.log(filteredTimeslots)
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