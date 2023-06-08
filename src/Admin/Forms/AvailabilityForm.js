import React, { useState } from 'react';
import { DateTime, Interval, Info } from 'luxon';
import Calendar from 'react-calendar';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  sectionContainer: {
    width: '100vw',
    height: '85vh',
    maxWidth: '500px',
  },
  sectionTitle: {
    textAlign: 'center',
  },
  calendar: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
  blockedDates: {
    width: '100%',
    height: '150px',
  },
  li: {
    cursor: 'pointer',
    backgroundColor: 'lightgray',
  },
  weekdaySelect: {
    fontFamily: 'Didact Gothic',
    marginRight: '10px',
  },
});

const AvailabilityForm = () => {
  // on option change -> show time range picker
  // add appointment buffer setting
  // store/fetch user settings in db

  const [disabledDays, setDisabledDays] = useState([]);
  const [disabledDates, setDisabledDates] = useState([]);
  const [activeWeekday, setActiveWeekday] = useState('Monday');
  const [activeDate, setActiveDate] = useState(new Date().toISOString());
  const classes = useStyles();

  const getDisabledDates = ({ activeStartDate, date, view }) => {
    if (date.getDay() === 0 && disabledDays.includes('Sunday')) {
      return true;
    } else if (date.getDay() === 1 && disabledDays.includes('Monday')) {
      return true;
    } else if (date.getDay() === 2 && disabledDays.includes('Tuesday')) {
      return true;
    } else if (date.getDay() === 3 && disabledDays.includes('Wednesday')) {
      return true;
    } else if (date.getDay() === 4 && disabledDays.includes('Thursday')) {
      return true;
    } else if (date.getDay() === 5 && disabledDays.includes('Friday')) {
      return true;
    } else if (date.getDay() === 6 && disabledDays.includes('Saturday')) {
      return true;
    } else if (disabledDates.includes(date.toISOString())) {
      return true;
    }
  };

  const updateDisabledDays = () => {
    !disabledDays.includes(activeWeekday)
      ? setDisabledDays((prev) => [...prev, activeWeekday])
      : setDisabledDays((prev) => prev.filter((day) => day !== activeWeekday));
  };

  //   const updateActiveWeekday = (e) => {
  //     setActiveWeekday(e.target.value)
  //     this.setState({
  //       activeWeekday: e.target.value,
  //     });
  //   };

  //   const updateActiveDate = (value) => {
  //     this.setState({
  //       activeDate: value,
  //     });
  //   };

  const updateDisabledDates = () => {
    !disabledDates.includes(activeDate)
      ? setDisabledDates((prev) => [...prev, activeDate])
      : setDisabledDates((prev) => prev.filter((date) => date !== activeDate));
  };
  // add enable date functionality to My Days Off
  return (
    <div className={classes.sectionContainer}>
      <h2 className={classes.sectionTitle}>Manage Your Availability</h2>
      <div className={classes.calendar}>
        <Calendar
          tileDisabled={getDisabledDates}
          calendarType="US"
          minDate={new Date()}
          onChange={(val) => setActiveDate(val.toISOString())}
          activeDate={activeDate}
        />
      </div>

      <div>
        <h4>Block/Unblock By Date:</h4>
        <div>
          <span>
            {DateTime.fromISO(activeDate).toLocaleString(DateTime.DATE_HUGE)}:{' '}
          </span>
          <button onClick={updateDisabledDates} id="change-blocked-status">
            {disabledDates.includes(activeDate) ? 'unblock' : 'block'}
          </button>
        </div>
        <div className={classes.blockedDates}>
          <h4>My Days Off</h4>
          <ul>
            {disabledDates.map((date) => {
              return (
                <li
                  key={date}
                  className={classes.li}
                  onClick={() => setActiveDate(date)}
                >
                  {DateTime.fromISO(date).toLocaleString(DateTime.DATE_HUGE)}
                </li>
              );
            })}
          </ul>
        </div>
        <br />
        <div>
          <h4>Block/Unblock Weekday:</h4>
          <select
            className={classes.weekdaySelect}
            onChange={(e) => setActiveWeekday(e.target.value)}
          >
            {Info.weekdays().map((day) => {
              return (
                <option value={day} key={day}>
                  {day}
                </option>
              );
            })}
          </select>

          <button onClick={updateDisabledDays}>
            {disabledDays.includes(activeWeekday) ? 'unblock' : 'block'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityForm;
