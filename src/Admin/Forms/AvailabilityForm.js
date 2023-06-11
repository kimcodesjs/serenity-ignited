import React, { useState } from 'react';
import { DateTime, Interval, Info } from 'luxon';
import Calendar from 'react-calendar';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  sectionContainer: {
    width: '500px',
    maxWidth: '80%',
    //height: '85vh',
    //margin: '20px',
  },
  sectionTitle: {
    textAlign: 'center',
  },
  calendar: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
  formSection: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    //justifyContent: 'center',
    width: '100%',
    maxWidth: '400px',
    marginLeft: 'auto',
    marginRight: 'auto',
    border: '1px dotted gray',
    borderRadius: '10px',
    //padding: '10px',
    marginTop: '20px',
  },
  fsHeading: {
    width: '400px',
    margin: '10px 5px 0px 10px',
  },
  h4: {
    margin: '10px 5px 10px 10px',
  },
  formButton: {
    borderRadius: '10px',
    cursor: 'pointer',
  },
  blockedDates: {
    width: '400px',
  },
  ul: {
    paddingInlineStart: '0px',
    display: 'flex',
    flexFlow: 'row wrap',
    marginTop: '0px',
    marginBottom: '5px',
    marginLeft: '10px',
  },
  li: {
    cursor: 'pointer',
    backgroundColor: 'lightgray',
    listStyleType: 'none',
    width: 'fit-content',
    borderRadius: '10px',
    padding: '5px',
    marginRight: '5px',
    marginBottom: '5px',
    select: 'none',
  },
  select: {
    fontFamily: 'Didact Gothic',
    margin: '10px',
    borderRadius: '10px',
    padding: '5px',
  },
  submitButton: {
    display: 'block',
    borderRadius: '10px',
    fontSize: '20px',
    margin: '10px auto',
    cursor: 'pointer',
  },
});

const AvailabilityForm = () => {
  // sort blocked dates in ascending order
  // show only blocked dates for current month
  // add appointment buffer setting
  // store/fetch user settings in db

  const [disabledDays, setDisabledDays] = useState([]);
  const [disabledDates, setDisabledDates] = useState([]);
  const [activeWeekday, setActiveWeekday] = useState('Monday');
  const [activeDate, setActiveDate] = useState(new Date().toISOString());
  const [workingHours, setWorkingHours] = useState({
    weekday: {
      start: {},
      end: {},
    },
    weekend: {
      start: {},
      end: {},
    },
  });

  const classes = useStyles();

  const getDisabledDates = ({ date }) => {
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

  const updateDisabledDates = () => {
    !disabledDates.includes(activeDate)
      ? setDisabledDates((prev) => [...prev, activeDate])
      : setDisabledDates((prev) => prev.filter((date) => date !== activeDate));
  };

  const createTimeSlots = () => {
    // using DateTimes and Interval here for ease of formatting times; the dates are irrelevant
    const start = DateTime.fromObject({ hour: 7 });
    const end = DateTime.fromObject({ hour: 22 });
    const timeslots = Interval.fromDateTimes(start, end).splitBy({
      minutes: 30,
    });
    return timeslots;
  };

  const updateWorkingHours = (type, key, value) => {
    let modifiedState = Object.assign({}, workingHours);
    modifiedState[type][key] = value;
    setWorkingHours(modifiedState);
  };

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
      <div className={classes.formSection}>
        {/* <h4 className={classes.formItem}>Block/Unblock By Date |</h4> */}
        <h4 className={classes.h4}>
          {DateTime.fromISO(activeDate).toLocaleString(DateTime.DATE_HUGE)}
          {' >'}
        </h4>
        <button
          className={classes.formButton}
          onClick={updateDisabledDates}
          id="change-blocked-status"
        >
          {disabledDates.includes(activeDate) ? 'unblock' : 'block'}
        </button>
        <div className={classes.blockedDates}>
          <ul className={classes.ul}>
            {disabledDates.length !== 0 ? (
              disabledDates.map((date) => {
                return (
                  <li
                    key={date}
                    className={classes.li}
                    onClick={() => setActiveDate(date)}
                  >
                    {DateTime.fromISO(date).toLocaleString(DateTime.DATE_HUGE)}
                  </li>
                );
              })
            ) : (
              <li className={classes.li}>blocked dates will display here</li>
            )}
          </ul>
        </div>
        {/* <h4 className={classes.formItem}>Block/Unblock Weekday:</h4> */}
        <select
          className={classes.select}
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

        <button className={classes.formButton} onClick={updateDisabledDays}>
          {disabledDays.includes(activeWeekday) ? 'unblock' : 'block'}
        </button>
      </div>
      <div className={classes.formSection}>
        <h4 className={classes.fsHeading}>Weekday Hours</h4>
        <select
          className={classes.select}
          onChange={(e) => {
            updateWorkingHours('weekday', 'start', {
              hour: DateTime.fromISO(e.target.value).hour,
              minute: DateTime.fromISO(e.target.value).minute,
            });
          }}
        >
          {createTimeSlots().map((timeslot, index) => {
            return (
              <option key={index} value={timeslot.start.toISO()}>
                {timeslot.start.toLocaleString(DateTime.TIME_SIMPLE)}
              </option>
            );
          })}
        </select>
        <span>-</span>
        <select
          className={classes.select}
          onChange={(e) => {
            updateWorkingHours('weekday', 'end', {
              hour: DateTime.fromISO(e.target.value).hour,
              minute: DateTime.fromISO(e.target.value).minute,
            });
          }}
        >
          {createTimeSlots().map((timeslot, index) => {
            return (
              <option key={index} value={timeslot.end.toISO()}>
                {timeslot.end.toLocaleString(DateTime.TIME_SIMPLE)}
              </option>
            );
          })}
        </select>
        <h4 className={classes.fsHeading}>Weekend Hours</h4>
        <select
          className={classes.select}
          onChange={(e) => {
            updateWorkingHours('weekend', 'start', {
              hour: DateTime.fromISO(e.target.value).hour,
              minute: DateTime.fromISO(e.target.value).minute,
            });
          }}
        >
          {createTimeSlots().map((timeslot, index) => {
            return (
              <option key={index} value={timeslot.start.toISO()}>
                {timeslot.start.toLocaleString(DateTime.TIME_SIMPLE)}
              </option>
            );
          })}
        </select>
        <span>-</span>
        <select
          className={classes.select}
          onChange={(e) => {
            updateWorkingHours('weekend', 'end', {
              hour: DateTime.fromISO(e.target.value).hour,
              minute: DateTime.fromISO(e.target.value).minute,
            });
          }}
        >
          {createTimeSlots().map((timeslot, index) => {
            return (
              <option key={index} value={timeslot.end.toISO()}>
                {timeslot.end.toLocaleString(DateTime.TIME_SIMPLE)}
              </option>
            );
          })}
        </select>
      </div>
      <button className={classes.submitButton}>Update Availability</button>
    </div>
  );
};

export default AvailabilityForm;
