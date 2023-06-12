import React, { useState, useEffect, useContext } from 'react';
import { DateTime, Interval, Info } from 'luxon';
import Calendar from 'react-calendar';
import { createUseStyles } from 'react-jss';
import { AdminContext } from '../../Context/AdminContext';

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

  const { practitionerData, updatePractitionerData } = useContext(AdminContext);

  const [blockedDays, setBlockedDays] = useState(practitionerData.blockedDays);
  const [blockedDates, setBlockedDates] = useState(
    practitionerData.blockedDates
  );
  const [workingHours, setWorkingHours] = useState(
    practitionerData.workingHours
  );
  const [activeWeekday, setActiveWeekday] = useState('Monday');
  const [activeDate, setActiveDate] = useState(new Date().toISOString());

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

  const updateBlockedDays = () => {
    !blockedDays.includes(activeWeekday)
      ? setBlockedDays((prev) => [...prev, activeWeekday])
      : setBlockedDays((prev) => prev.filter((day) => day !== activeWeekday));
  };

  const updateBlockedDates = () => {
    !blockedDates.includes(activeDate)
      ? setBlockedDates((prev) => [...prev, activeDate])
      : setBlockedDates((prev) => prev.filter((date) => date !== activeDate));
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

  // For lack of a better word, type refers to 'weekday' or 'weekend'; key is 'start' or 'end'
  const updateWorkingHours = (type, key, value) => {
    let modifiedState = Object.assign({}, workingHours);
    modifiedState[type][key] = value;
    setWorkingHours(modifiedState);
  };

  const isSelected = (type, key) => {
    const current = {
      hour: workingHours[type][key].hour,
      minute: workingHours[type][key].minute,
    };
    const match = createTimeSlots().find(
      (timeslot) =>
        timeslot[key].hour === current.hour &&
        timeslot[key].minute === current.minute
    );
    return match[key].toISO();
  };

  return (
    <div className={classes.sectionContainer}>
      <h2 className={classes.sectionTitle}>Manage Your Availability</h2>
      <div className={classes.calendar}>
        <Calendar
          tileDisabled={getBlockedDates}
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
          onClick={updateBlockedDates}
          id="change-blocked-status"
        >
          {blockedDates.includes(activeDate) ? 'unblock' : 'block'}
        </button>
        <div className={classes.blockedDates}>
          <ul className={classes.ul}>
            {blockedDates.length !== 0 ? (
              blockedDates.map((date) => {
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

        <button className={classes.formButton} onClick={updateBlockedDays}>
          {blockedDays.includes(activeWeekday) ? 'unblock' : 'block'}
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
          value={isSelected('weekday', 'start')}
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
          value={isSelected('weekday', 'end')}
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
          value={isSelected('weekend', 'start')}
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
          value={isSelected('weekend', 'end')}
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
