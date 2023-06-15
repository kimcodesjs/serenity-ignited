import React, { useState, useContext } from 'react';
import { createUseStyles } from 'react-jss';
import { DateTime } from 'luxon';
import { EventContext } from '../Context/EventContext';
import EventForm from './Forms/EventForm';
import adminStyles from './adminStyles';

const useStyles = createUseStyles(adminStyles);
const EventAdmin = () => {
  const { meditations, workshops } = useContext(EventContext);
  const [activeEvent, setActiveEvent] = useState(null);
  const classes = useStyles();
  // how will events be sorted?

  const onEventClick = (e, category) => {
    if (!category) return setActiveEvent(null);
    let event = category.find((event) => event._id === e.target.id);
    setActiveEvent(event ? event : null);
  };
  return (
    <div className={classes.sectionContainer}>
      <h2 className={classes.sectionTitle}>Manage Your Events</h2>
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
          <li className={classes.li} id="new" onClick={onEventClick}>
            New Event
          </li>
          {meditations.length === 0 && workshops.length === 0 && (
            <li className={classes.li}>
              Workshops and Meditations will display here!
            </li>
          )}
        </ul>
      </div>
      <EventForm event={activeEvent} />
    </div>
  );
};

export default EventAdmin;
