import React, {useState} from 'react'
import {DateTime, Interval, Info} from 'luxon'
import Calendar from 'react-calendar'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    container: {
        width: '100%',
        justifyContent: 'center',
        display: 'inline-flex'
    },
    availabilityOptions: {
        paddingLeft: '10px'
    },
    calendar: {
        
    }
    
})

class AvailabilityForm extends React.Component {
    // on option change -> show time range picker
    // add appointment buffer setting
    // store/fetch user settings in db

    constructor() {
		super()
		this.state = {
            disabledDays: [],
            disabledDates: [],
            aciveWeekday: 'Monday',
            activeDate: new Date
        }
        
    }
  
    //classes = useStyles() -> convert class component to function component?

    getDisabledDates = ({activeStartDate, date, view }) => {
       
        if (date.getDay() === 0 && this.state.disabledDays.includes('Sunday')) {
            return true
        } else if (date.getDay() === 1 && this.state.disabledDays.includes('Monday')) {
            return true
        } else if (date.getDay() === 2 && this.state.disabledDays.includes('Tuesday')) {
            return true
        } else if (date.getDay() === 3 && this.state.disabledDays.includes('Wednesday')) {
            return true
        } else if (date.getDay() === 4 && this.state.disabledDays.includes('Thursday')) {
            return true
        } else if (date.getDay() === 5 && this.state.disabledDays.includes('Friday')) {
            return true
        } else if (date.getDay() === 6 && this.state.disabledDays.includes('Saturday')) {
            return true
        } else if (this.state.disabledDates.includes(date.toISOString())) {
            return true
        }
    }

    updateDisabledDays = () => {
        !this.state.disabledDays.includes(this.state.aciveWeekday) ? 
            this.setState({
                disabledDays: [...this.state.disabledDays, this.state.aciveWeekday]
            }):
            this.setState({
                disabledDays: this.state.disabledDays.filter(day => day !== this.state.aciveWeekday)
            }) 
    }

    updateActiveWeekday = (e) => {
        this.setState({
            aciveWeekday: e.target.value
        })
    }

    updateActiveDate = (value) => {
        
        this.setState({
            activeDate: value
        })
        
    }

    updateDisabledDates = () => {
        let activeISO = this.state.activeDate.toISOString()
        !this.state.disabledDates.includes(activeISO) ? 
            this.setState({
                disabledDates: [...this.state.disabledDates, activeISO]
            }):
            this.setState({
                disabledDates: this.state.disabledDates.filter(date => date !== activeISO)
            })

        console.log(this.state.disabledDates)
    }
    // add enable date functionality to My Days Off 
    render () {
        return (
        <div>
            <h3>{this.props.practitioner}'s availability:</h3> 
            
            <div>
                <Calendar 
                    tileDisabled={this.getDisabledDates}
                    calendarType='US'
                    minDate={new Date()}
                    onChange={this.updateActiveDate}/>
            </div>

            <div>
                <h3>Manage Availability</h3>
                <p>{this.state.activeDate.toLocaleDateString(undefined, {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</p>
                <button onClick={this.updateDisabledDates}>{this.state.disabledDates.includes(this.state.activeDate) ? 'enable' : 'disable'}</button>

                <select onChange={this.updateActiveWeekday}>
                    {Info.weekdays().map(day => {
                    return (
                        <option value={day} key={day}>{day}</option>  
                    )
                    })}
                </select>

                <button onClick={this.updateDisabledDays}>{this.state.disabledDays.includes(this.state.aciveWeekday) ? 'enable' : 'disable'}</button>
                <h4>My Days Off</h4>
                {
                this.state.disabledDates.map(date => {
                    return (
                        <p key={date} >{new Date(date).toLocaleDateString(undefined, {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</p>
                    )
                })
                }
            <div>
                
            </div>
            </div>
        </div>
    
        )
    }
}

export default AvailabilityForm