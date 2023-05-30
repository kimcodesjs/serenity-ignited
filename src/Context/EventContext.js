import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const EventContext = createContext(null);

function EventProvider(props) {
  const [meditations, setMeditations] = useState(null);
  const [workshops, setWorkshops] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        await axios({
          method: 'GET',
          url: 'http://127.0.0.1:3000/api/v1/events/get-all-events',
        }).then((res) => {
          const meditationEvents = [];
          const workshopEvents = [];
          res.data.data.forEach((event) => {
            event.category === 'meditation'
              ? meditationEvents.push(event)
              : workshopEvents.push(event);
          });
          setMeditations(meditationEvents);
          setWorkshops(workshopEvents);
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchEvents();
  }, []);

  const value = {
    workshops,
    meditations,
  };
  return <EventContext.Provider value={value} {...props} />;
}

export { EventContext, EventProvider };
