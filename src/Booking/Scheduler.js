import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'

const Scheduler = ({ setSchedule }) => {

    let [activeDate, setActiveDate] = useState(null)

    useEffect(() => {
        console.log(activeDate)
    }, [activeDate])
    
    const updateActiveDate = (value) => {
        setActiveDate(value.toDateString())
    }
    return (
        <>
            <h3>When would you like to receive your healing?</h3>
            <br />
            
            <Calendar 
                calendarType='US'
                onChange={updateActiveDate}
                minDate={new Date()}/>
            <div>
                <span>{activeDate}</span>
                <span></span>
            </div>
        </>
    )
}
export default Scheduler