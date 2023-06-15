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

  const createEvent = async (formData) => {
    try {
      await axios({
        method: 'POST',
        url: 'http://127.0.0.1:3000/api/v1/events/create-event',
        withCredentials: true,
        data: formData,
      }).then((res) => {
        res.data.data.category === 'meditation'
          ? setMeditations((prev) => [...prev, res.data.data])
          : setWorkshops((prev) => [...prev, res.data.data]);
      });
    } catch (err) {
      showAlert(err.response.data.message, 'error');
    }
  };
  const value = {
    workshops,
    meditations,
    createEvent,
  };
  return <EventContext.Provider value={value} {...props} />;
}

export { EventContext, EventProvider };
