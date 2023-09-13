import React, { useEffect, useState, useContext } from 'react';
import { createUseStyles } from 'react-jss';
import Calendar from 'react-calendar';
import { DateTime, Duration, Interval } from 'luxon';
import { BookingContext } from '../../Context/BookingContext';

const useStyles = createUseStyles({
  viewContainer: {
    height: '88vh',
    maxWidth: '700px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    overflowX: 'hidden',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  viewPrompt: {
    marginBottom: '0',
    '@media (max-width: 920px)': {
      fontSize: '24px',
      marginLeft: '70px',
      marginRight: '70px',
    },
    '@media (max-width: 300px)': {
      fontSize: '24px',
      marginLeft: '20px',
      marginRight: '20px',
    },
  },
  container: {
    width: '100%',
    //justifyContent: 'center',
    display: 'inline-flex',
    '@media (max-width: 920px)': {
      flexDirection: 'column',
    },
  },
  timeSlots: {
    height: '125px',
    width: '300px',
    maxWidth: '80%',
    fontWeight: 'bold',
    color: 'white',
    textShadow: '#e5d7d7 1px 0px 5px',
    background:
      'radial-gradient(ellipse at top, rgba(64, 69, 178, .92), transparent), radial-gradient(ellipse at bottom, rgba(56, 17, 17, 1), transparent)',
    borderRadius: '10px',
    filter: 'drop-shadow(2px 2px 1px #443356)',
    marginBottom: '20px',
  },
  date: {
    '@media (max-width: 920px)': {
      fontSize: '24px',
    },
  },
  timePicker: {
    fontFamily: 'inherit',
    borderRadius: '10px',
    border: 'none',
    padding: '5px',
    '&:focus': {
      border: 'solid 1px #443356',
    },
  },
});
const Scheduler = ({ setSchedule, duration }) => {
  const classes = useStyles();

  const [activeDate, setActiveDate] = useState(DateTime.now());
  const [activeTimeslot, setActiveTimeslot] = useState(null);
  const [availableTimeslots, setTimeslots] = useState([]);

  const { availability, appointments } = useContext(BookingContext);

  // triggers createTimeslots when active date is changed
  useEffect(() => {
    // Existing bookings
    let currentBookings = appointments.map((appointment) =>
      addBuffer(Interval.fromISO(appointment))
    );

    // Working hours
    let workingHours;
    activeDate.weekday === 0 || activeDate.weekday === 6
      ? (workingHours = Interval.fromDateTimes(
          activeDate.set(availability.workingHours.weekend.start),
          activeDate.set(availability.workingHours.weekend.end)
        ))
      : (workingHours = Interval.fromDateTimes(
          activeDate.set(availability.workingHours.weekday.start),
          activeDate.set(availability.workingHours.weekday.end)
        ));

    createTimeSlots(duration, currentBookings, workingHours);
  }, [activeDate]);

  // sets active date/time for session
  useEffect(() => {
    activeTimeslot &&
      setSchedule({
        date: activeDate,
        time: activeTimeslot,
      });
  }, [activeDate, activeTimeslot]);

  const addBuffer = (bookingInterval) =>
    Interval.fromDateTimes(
      bookingInterval.start,
      bookingInterval.end.plus({ minutes: 15 })
    );

  const getBlockedDates = ({ date }) => {
    if (date.getDay() === 0 && availability.blockedDays.includes('Sunday')) {
      return true;
    } else if (
      date.getDay() === 1 &&
      availability.blockedDays.includes('Monday')
    ) {
      return true;
    } else if (
      date.getDay() === 2 &&
      availability.blockedDays.includes('Tuesday')
    ) {
      return true;
    } else if (
      date.getDay() === 3 &&
      availability.blockedDays.includes('Wednesday')
    ) {
      return true;
    } else if (
      date.getDay() === 4 &&
      availability.blockedDays.includes('Thursday')
    ) {
      return true;
    } else if (
      date.getDay() === 5 &&
      availability.blockedDays.includes('Friday')
    ) {
      return true;
    } else if (
      date.getDay() === 6 &&
      availability.blockedDays.includes('Saturday')
    ) {
      return true;
    } else if (availability.blockedDates.includes(date.toISOString())) {
      return true;
    }
  };

  // generate available timeslots based on session duration
  // taking into account existing bookings and that days working hours
  const createTimeSlots = (duration, bookings, workingHours) => {
    const sessionLength = Duration.fromObject(duration);
    const timeslots = workingHours.splitBy(sessionLength);
    if (bookings.length === 0) {
      setTimeslots(timeslots);
      return;
    }
    const filteredTimeslots = [];
    for (let i = 0; i < timeslots.length; i++) {
      for (let j = 0; j < bookings.length; j++) {
        if (timeslots[i].overlaps(bookings[j])) {
          break;
        } else {
          if (
            j === bookings.length - 1 &&
            timeslots[i].isAfter(DateTime.now())
          ) {
            filteredTimeslots.push(timeslots[i]);
          }
        }
      }
    }
    setTimeslots(filteredTimeslots);
  };

  const updateActiveDate = (value) => {
    setActiveDate(DateTime.fromJSDate(value));
  };

  return (
    <div className={classes.viewContainer}>
      <h1 className={classes.viewPrompt}>
        When would you like to receive your healing?
      </h1>
      <br />
      <div className={classes.timeSlots}>
        <h2 className={classes.date}>
          {activeDate.toLocaleString(DateTime.DATE_HUGE)}
        </h2>

        <select
          onChange={(e) => {
            e.preventDefault;
            setActiveTimeslot(Interval.fromISO(e.target.value));
          }}
          defaultValue="default"
          className={classes.timePicker}
        >
          <option disabled hidden value="default">
            Please select a timeslot.
          </option>
          {availableTimeslots.map((timeslot, index) => {
            // console.log('new timeslot mapped');
            return (
              <option key={index} value={timeslot.toISO()}>
                {timeslot.start.toLocaleString(DateTime.TIME_SIMPLE)} -{' '}
                {timeslot.end.toLocaleString(DateTime.TIME_SIMPLE)}
              </option>
            );
          })}
        </select>
      </div>
      <Calendar
        calendarType="US"
        onChange={updateActiveDate}
        minDate={new Date()}
        tileDisabled={getBlockedDates}
      />
    </div>
  );
};

export default Scheduler;
