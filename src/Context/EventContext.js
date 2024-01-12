import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { showAlert } from '../Utilities/alert';

const EventContext = createContext(null);

function EventProvider(props) {
  const [meditations, setMeditations] = useState([]);
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        await axios({
          method: 'GET',
          url: `${process.env.URL}/api/v1/events/`,
        }).then((res) => {
          const meditationEvents = [];
          const workshopEvents = [];
          // console.log(res);
          res.data.data.forEach((event) => {
            event.category === 'meditation'
              ? meditationEvents.push(event)
              : workshopEvents.push(event);
          });
          setMeditations(meditationEvents);
          setWorkshops(workshopEvents);
        });
      } catch (err) {
        showAlert('Uh oh, something went wrong loading event data.', 'error');
      }
    };
    fetchEvents();
  }, []);

  const createEvent = async (formData) => {
    try {
      await axios({
        method: 'POST',
        url: `${process.env.URL}/api/v1/events/`,
        withCredentials: true,
        data: formData,
      }).then((res) => {
        res.data.data.category === 'meditation'
          ? setMeditations((prev) => [...prev, res.data.data])
          : setWorkshops((prev) => [...prev, res.data.data]);
      });
    } catch (err) {
      showAlert(
        'Something went wrong, could not create the new event. Please try again!',
        'error'
      );
    }
  };

  const updateEvent = async (formData, id) => {
    try {
      await axios({
        method: 'PATCH',
        url: `${process.env.URL}/api/v1/events/${id}`,
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

  const submitPurchase = async (event, quantity, paymentToken) => {
    try {
      await axios({
        method: 'POST',
        url: `${process.env.URL}/api/v1/events/purchase-ticket`,
        withCredentials: true,
        data: {
          event: event._id,
          price: event.price * quantity,
          quantity,
          paymentToken,
        },
      });
    } catch (err) {
      showEAlert(err.response.data.message, 'error');
    }
  };
  const value = {
    workshops,
    meditations,
    createEvent,
    updateEvent,
    submitPurchase,
  };
  return <EventContext.Provider value={value} {...props} />;
}

export { EventContext, EventProvider };
