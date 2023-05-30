import React, { useContext } from 'react';
import { EventContext } from '../Context/EventContext';
import { DateTime } from 'luxon';
import NewEvent from './Forms/NewEvent';

const EventAdmin = () => {
  const { meditations, workshops } = useContext(EventContext);

  // how will events be sorted?

  return (
    <div>
      <h2>Manage Your Events</h2>
      <h3>Upcoming Events</h3>
      <ul>
        {meditations.map((event) => (
          <li key={event._id}>
            {`${DateTime.fromISO(event.start).toLocaleString(
              DateTime.DATE_HUGE
            )}: ${event.name}`}
          </li>
        ))}
        {workshops.map((event) => (
          <li key={event._id}>
            {`${DateTime.fromISO(event.start).toLocaleString(
              DateTime.DATE_HUGE
            )}: ${event.name}`}
          </li>
        ))}
      </ul>
      <br />
      <h3>Create an Event</h3>
      <NewEvent />
    </div>
  );
};

export default EventAdmin;
