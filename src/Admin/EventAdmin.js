import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import { DateTime } from 'luxon';
import NewEvent from './Forms/NewEvent';

const EventAdmin = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        await axios({
          method: 'GET',
          url: 'http://127.0.0.1:3000/api/v1/events/get-all-events',
          withCredentials: true,
        }).then((res) => {
          setEvents(res.data.data);
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchEvents();
  }, []);

  // how will events be sorted?

  return (
    <div>
      <h2>Manage Your Events</h2>
      <h3>Upcoming Events</h3>
      {events.map((event) => (
        <div key={event._id}>
          <p>
            {`${DateTime.fromISO(event.start).toLocaleString(
              DateTime.DATE_HUGE
            )}: ${event.name}`}
          </p>
        </div>
      ))}
      <br />
      <h3>Create an Event</h3>
      <NewEvent />
    </div>
  );
};

export default EventAdmin;
