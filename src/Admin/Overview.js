import React, { useState, useEffect, useContext } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import { DateTime } from 'luxon';
import { createUseStyles } from 'react-jss';
import adminStyles from './adminStyles';

const useStyles = createUseStyles(adminStyles);

const Overview = ({
  setActiveEvent,
  setActiveView,
  meditations,
  workshops,
}) => {
  const [appointments, setAppointments] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        await axios({
          method: 'GET',
          url: 'http://127.0.0.1:3000/api/v1/appointments/get-all-appointments',
          withCredentials: true,
        }).then((res) => {
          setAppointments(res.data.data);
        });
      } catch (err) {
        // console.log(err);
      }
    };
    fetchAppointments();
  }, []);

  const onEventClick = (e, category) => {
    if (!category) return setActiveEvent(null);
    let event = category.find((event) => event._id === e.target.id);
    setActiveEvent(event ? event : null);
    setActiveView('events');
  };
  // how will appointments be sorted?

  return (
    <div className={classes.sectionContainer}>
      <h2 className={classes.sectionTitle}>Overview</h2>
      <div className={classes.formSection}>
        <h3 className={classes.fsHeading}>Upcoming Appointments</h3>
        <ul className={classes.ul}>
          {appointments.map((appointment) => (
            <li className={classes.li} key={appointment._id}>
              {`${appointment.user.firstName} ${appointment.user.lastName}, ${appointment.session.name}`}
            </li>
          ))}
          {appointments.length === 0 && (
            <li className={classes.li}>
              Workshops and Meditations will display here!
            </li>
          )}
        </ul>
      </div>
      <div className={classes.formSection}>
        <h3 className={classes.fsHeading}>Upcoming Events</h3>
        <ul className={classes.ul}>
          {meditations.map((event) => (
            <li
              key={event._id}
              id={event._id}
              className={classes.li}
              onClick={(e) => onEventClick(e, meditations)}
            >
              {`${DateTime.fromISO(event.start).toLocaleString(
                DateTime.DATE_HUGE
              )}: ${event.name}`}
            </li>
          ))}
          {workshops.map((event) => (
            <li
              key={event._id}
              className={classes.li}
              onClick={(e) => onEventClick(e, workshops)}
            >
              {`${DateTime.fromISO(event.start).toLocaleString(
                DateTime.DATE_HUGE
              )}: ${event.name}`}
            </li>
          ))}
          {meditations.length === 0 && workshops.length === 0 && (
            <li className={classes.li}>
              Workshops and Meditations will display here!
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Overview;
