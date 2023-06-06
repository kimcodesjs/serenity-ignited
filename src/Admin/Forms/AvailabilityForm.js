import React, { useState } from 'react';
import { DateTime, Interval, Info } from 'luxon';
import Calendar from 'react-calendar';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    width: '100%',
    justifyContent: 'center',
    display: 'inline-flex',
  },
  availabilityOptions: {
    paddingLeft: '10px',
  },
  calendar: {},
});

const AvailabilityForm = () => {
  // on option change -> show time range picker
  // add appointment buffer setting
  // store/fetch user settings in db

  const [disabledDays, setDisabledDays] = useState([]);
  const [disabledDates, setDisabledDates] = useState([]);
  const [activeWeekday, setActiveWeekday] = useState('Monday');
  const [activeDate, setActiveDate] = useState(new Date());
  //classes = useStyles() -> convert class component to function component?

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
    let activeISO = activeDate.toISOString();
    !disabledDates.includes(activeISO)
      ? setDisabledDates((prev) => [...prev, activeISO])
      : setDisabledDates((prev) => prev.filter((date) => date !== activeISO));
  };
  // add enable date functionality to My Days Off
  return (
    <div>
      <h3> Your availability:</h3>

      <div>
        <Calendar
          tileDisabled={getDisabledDates}
          calendarType="US"
          minDate={new Date()}
          onChange={setActiveDate}
          activeDate={activeDate}
        />
      </div>

      <div>
        <h4>Block Specific Dates</h4>
        <div>
          <span>
            {DateTime.fromJSDate(activeDate).toLocaleString(DateTime.DATE_HUGE)}
            :{' '}
          </span>
          <button onClick={updateDisabledDates} id="change-blocked-status">
            {disabledDates.includes(activeDate) ? 'enable' : 'disable'}
          </button>
        </div>
        <h4>My Days Off</h4>
        <ul>
          {disabledDates.map((date) => {
            return (
              <li key={date}>
                {DateTime.fromISO(date).toLocaleString(DateTime.DATE_HUGE)}
              </li>
            );
          })}
        </ul>
        <br />
        <select onChange={(e) => setActiveWeekday(e.target.value)}>
          {Info.weekdays().map((day) => {
            return (
              <option value={day} key={day}>
                {day}
              </option>
            );
          })}
        </select>

        <button onClick={updateDisabledDays}>
          {disabledDays.includes(activeWeekday) ? 'enable' : 'disable'}
        </button>

        <div></div>
      </div>
    </div>
  );
};

export default AvailabilityForm;
