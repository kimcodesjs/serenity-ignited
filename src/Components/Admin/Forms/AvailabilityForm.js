import React, {useState} from 'react'
import {DateTime, Interval, Info} from 'luxon'
import Calendar from 'react-calendar'


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
            activeDate: new Date().toDateString()
        }
        
    }
  

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
        } else if (this.state.disabledDates.includes(date.getDate())) {
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
        console.log(value)
        this.setState({
            activeDate: value.toDateString()
        })
    }

    updateDisabledDates = () => {
        let extractedDate = this.state.activeDate.match(/(\d+)/)
        let parsedDate = parseInt(extractedDate[0])
        !this.state.disabledDates.includes(this.state.activeDate) ? 
            this.setState({
                disabledDates: [...this.state.disabledDates, parsedDate]
            }):
            this.setState({
                disabledDates: this.state.disabledDates.filter(date => date !== parsedDate)
            })
    }
    // disabledDates currently disables that date number in all months
    render () {
        return (
        <div>
            <h3>{this.props.practitioner}'s availability:</h3> 
            <select onChange={this.updateActiveWeekday}>
                {Info.weekdays().map(day => {
                return (
                    <option value={day} key={day}>{day}</option>  
                )
                })}
            </select>
            <button onClick={this.updateDisabledDays}>{this.state.disabledDays.includes(this.state.aciveWeekday) ? 'enable' : 'disable'}</button>
            <Calendar 
                tileDisabled={this.getDisabledDates}
                calendarType='US'
                minDate={new Date()}
                onChange={this.updateActiveDate}/>
            <p>{this.state.activeDate}</p>
            <button onClick={this.updateDisabledDates}>{this.state.disabledDates.includes(this.state.activeDate) ? 'enable' : 'disable'}</button>
            {console.log(this.state.disabledDates)}
        </div>
    
        )
    }
}

export default AvailabilityForm