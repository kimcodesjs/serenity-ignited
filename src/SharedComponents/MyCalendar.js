import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  calendar: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
});
const MyCalendar = ({ onChange, blockedDays, blockedDates, activeDate }) => {
  const classes = useStyles();

  const getBlockedDates = ({ date }) => {
    if (date.getDay() === 0 && blockedDays.includes('Sunday')) {
      return true;
    } else if (date.getDay() === 1 && blockedDays.includes('Monday')) {
      return true;
    } else if (date.getDay() === 2 && blockedDays.includes('Tuesday')) {
      return true;
    } else if (date.getDay() === 3 && blockedDays.includes('Wednesday')) {
      return true;
    } else if (date.getDay() === 4 && blockedDays.includes('Thursday')) {
      return true;
    } else if (date.getDay() === 5 && blockedDays.includes('Friday')) {
      return true;
    } else if (date.getDay() === 6 && blockedDays.includes('Saturday')) {
      return true;
    } else if (blockedDates.includes(date.toISOString())) {
      return true;
    }
  };

  return (
    <div className={classes.calendar}>
      <Calendar
        tileDisabled={getBlockedDates}
        calendarType="US"
        minDate={new Date()}
        onChange={onChange}
        activeDate={activeDate ? activeDate : null}
      />
    </div>
  );
};

export default MyCalendar;
