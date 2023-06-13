import React, { useContext } from 'react';
import { createUseStyles } from 'react-jss';
import { DateTime } from 'luxon';
import { EventContext } from '../Context/EventContext';
import NewEvent from './Forms/NewEvent';
import adminStyles from './adminStyles';

const useStyles = createUseStyles(adminStyles);
const EventAdmin = () => {
  const { meditations, workshops } = useContext(EventContext);

  const classes = useStyles();
  // how will events be sorted?

  return (
    <div className={classes.sectionContainer}>
      <h2 className={classes.sectionTitle}>Manage Your Events</h2>
      <div className={classes.formSection}>
        <h3 className={classes.fsHeading}>Upcoming Events</h3>
        <ul className={classes.ul}>
          {meditations.map((event) => (
            <li key={event._id} className={classes.li}>
              {`${DateTime.fromISO(event.start).toLocaleString(
                DateTime.DATE_HUGE
              )}: ${event.name}`}
            </li>
          ))}
          {workshops.map((event) => (
            <li key={event._id} className={classes.li}>
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
      <NewEvent />
    </div>
  );
};

export default EventAdmin;
