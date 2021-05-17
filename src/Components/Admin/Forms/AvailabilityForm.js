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
            currentSelection: 'Monday'
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
        }
    }

    onClick = () => {
        !this.state.disabledDays.includes(this.state.currentSelection) ? 
            this.setState({
                disabledDays: [...this.state.disabledDays, this.state.currentSelection]
            }):
            this.setState({
                disabledDays: this.state.disabledDays.filter(day => day !== this.state.currentSelection)
            })
        
            
    }

    onChange = (e) => {
        this.setState({
            currentSelection: e.target.value
        })
    }


    render () {
        return (
        <div>
            <h3>{this.props.practitioner}'s weekday availability:</h3>
            <select onChange={this.onChange}>
                {Info.weekdays().map(day => {
                return (
                    <option value={day} key={day}>{day}</option>  
                )
                })}
            </select>
            <button onClick={this.onClick}>{this.state.disabledDays.includes(this.state.currentSelection) ? 'enable' : 'disable'}</button>
            <Calendar 
                tileDisabled={this.getDisabledDates}/>
            
        </div>
    
        )
    }
}

export default AvailabilityForm