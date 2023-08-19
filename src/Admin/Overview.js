import React, { useState, useEffect, useContext } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import { DateTime } from 'luxon';
import { createUseStyles } from 'react-jss';
import adminStyles from './adminStyles';
import { AdminContext } from '../Context/AdminContext';

const useStyles = createUseStyles(adminStyles);

const Overview = ({
  setActiveEvent,
  setActiveView,
  meditations,
  workshops,
}) => {
  const classes = useStyles();

  const { appointments } = useContext(AdminContext);

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
            <li className={classes.li}>No upcoming appointments yet...</li>
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
