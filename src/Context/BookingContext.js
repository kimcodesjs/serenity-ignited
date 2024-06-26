import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { showAlert } from '../Utilities/alert';

const BookingContext = createContext(null);

function BookingProvider(props) {
  const [availability, setData] = useState(null);
  const [sessions, setSessions] = useState(null);
  const [appointments, setAppointments] = useState(null);

  useEffect(() => {
    const getPractitionerData = async () => {
      try {
        await axios({
          method: 'GET',
          url: `${process.env.SERVER_URL}/api/v1/practitioners/6487bb6d6cd84d6d6859954c`,
        }).then((res) => {
          setData(res.data.data);
        });
      } catch (err) {
        // console.log(err);
      }
    };
    getPractitionerData();
  }, []);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        await axios({
          method: 'GET',
          url: `${process.env.SERVER_URL}/api/v1/sessions/get-all-sessions`,
        }).then((res) => {
          setSessions(res.data.data);
        });
      } catch (err) {
        // console.log(err);
      }
    };
    fetchSessions();
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        await axios({
          method: 'GET',
          url: `${process.env.SERVER_URL}/api/v1/appointments/`,
        }).then((res) => {
          setAppointments(res.data.data);
        });
      } catch (err) {
        // console.log(err);
      }
    };
    fetchAppointments();
  }, []);

  const value = {
    availability,
    sessions,
    appointments,
  };

  return <BookingContext.Provider value={value} {...props} />;
}

export { BookingContext, BookingProvider };
