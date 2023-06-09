import React, { useState } from 'react';
import { DateTime, Interval, Info } from 'luxon';
import Calendar from 'react-calendar';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  sectionContainer: {
    width: '500px',
    maxWidth: '80%',
    height: '85vh',
    margin: '20px',
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
    alignItems: 'center',
    //justifyContent: 'center',
    width: '400px',
    maxWidth: '100%',
    margin: 'auto',
  },
  formItem: {
    marginRight: '5px',
    borderRadius: '10px',
  },
  blockedDates: {
    width: '100%',
    height: '150px',
  },
  ul: {
    paddingInlineStart: '0px',
    display: 'flex',
    flexFlow: 'row wrap',
    marginTop: '0px',
  },
  li: {
    cursor: 'pointer',
    backgroundColor: 'lightgray',
    listStyleType: 'none',
    width: 'fit-content',
    borderRadius: '10px',
    padding: '5px',
    margin: '5px',
    select: 'none',
  },
  select: {
    fontFamily: 'Didact Gothic',
    marginRight: '10px',
    borderRadius: '10px',
    padding: '5px',
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
      <div className={classes.formSection}>
        {/* <h4 className={classes.formItem}>Block/Unblock By Date |</h4> */}
        <h4 className={classes.formItem}>
          {DateTime.fromISO(activeDate).toLocaleString(DateTime.DATE_HUGE)}
          {' >'}
        </h4>
        <button
          className={classes.formItem}
          onClick={updateDisabledDates}
          id="change-blocked-status"
        >
          {disabledDates.includes(activeDate) ? 'unblock' : 'block'}
        </button>
      </div>
      <div className={classes.formSection}>
        {/* <h4>Days Off</h4> */}
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
      <br />
      <div className={classes.formSection}>
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

        <button className={classes.formItem} onClick={updateDisabledDays}>
          {disabledDays.includes(activeWeekday) ? 'unblock' : 'block'}
        </button>
      </div>
    </div>
  );
};

export default AvailabilityForm;
