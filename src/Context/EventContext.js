import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const EventContext = createContext(null);

function EventProvider(props) {
  const [meditations, setMeditations] = useState([]);
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        await axios({
          method: 'GET',
          url: 'http://127.0.0.1:3000/api/v1/events/',
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
        showAlert(err.response.data.message, 'error');
      }
    };
    fetchEvents();
  }, []);

  const createEvent = async (formData) => {
    try {
      await axios({
        method: 'POST',
        url: 'http://127.0.0.1:3000/api/v1/events/',
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

  const updateEvent = async (formData, id) => {
    try {
      await axios({
        method: 'PATCH',
        url: `http://127.0.0.1:3000/api/v1/events/${id}`,
        withCredentials: true,
        data: formData,
      }).then((res) => {
        res.data.data.category === 'meditation'
          ? setMeditations((prev) =>
              prev.map((event) => (event._id === id ? res.data.data : event))
            )
          : setWorkshops(
              prev.map((event) => (event._id === id ? res.data.data : event))
            );
      });
    } catch (err) {
      showAlert(err.response.data.message, 'error');
    }
  };
  const value = {
    workshops,
    meditations,
    createEvent,
    updateEvent,
  };
  return <EventContext.Provider value={value} {...props} />;
}

export { EventContext, EventProvider };