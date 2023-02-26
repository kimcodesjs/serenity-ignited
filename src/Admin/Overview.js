import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import { DateTime } from 'luxon';

const Overview = () => {
  const [appointments, setAppointments] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        await axios({
          method: 'GET',
          url: 'http://127.0.0.1:3000/api/v1/appointments/get-all-appointments',
          withCredentials: true,
        }).then((res) => {
          setAppointments(res.data.data);
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchAppointments();
  }, []);

  // how will appointments be sorted?

  return (
    <div>
      <h2>Overview</h2>
      <h3>Upcoming Appointments</h3>
      <Calendar
      //tileDisabled={getDisabledDates}
      />
      {appointments
        ? appointments.map((appointment) => (
            <div key={appointment._id}>
              <p>
                {`${appointment.user.firstName} ${appointment.user.lastName}, ${appointment.session.name}`}
              </p>
            </div>
          ))
        : null}
      <br />
      <p>Sales Data</p>
    </div>
  );
};

export default Overview;
