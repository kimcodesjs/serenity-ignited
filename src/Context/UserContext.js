import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { showAlert } from '../Utilities/alert';

const UserContext = createContext(null);

function UserProvider(props) {
  const [userAppointments, setUserAppointments] = useState([]);

  useEffect(() => {
    const getAppointments = async () => {
      try {
        await axios({
          method: 'GET',
          url: `${process.env.SERVER_URL}/api/v1/appointments/get-my-appointments`,
          withCredentials: true,
        }).then((res) => {
          setUserAppointments(res.data.data);
        });
      } catch (err) {
        showAlert('Something went wrong!', 'error');
      }
    };
    getAppointments();
  }, []);

  const deleteAppointment = async (id) => {
    try {
      await axios({
        method: 'DELETE',
        url: `${process.env.SERVER_URL}/api/v1/appointments/${id}`,
        withCredentials: true,
      }).then((res) => {
        setUserAppointments((prev) =>
          prev.filter((appointment) => appointment._id !== id)
        );
        showAlert('Appointment deleted!', 'success');
      });
    } catch (err) {
      showAlert('Something went wrong!', 'error');
    }
  };

  const updateAppointment = async (updates, id) => {
    try {
      await axios({
        method: 'PATCH',
        url: `${process.env.SERVER_URL}/api/v1/appointments/${id}`,
        withCredentials: true,
        data: updates,
      }).then((res) => {
        setUserAppointments((prev) =>
          prev.map((appointment) =>
            appointment._id === id ? res.data.data : appointment
          )
        );
      });
    } catch (err) {
      showAlert('Something went wrong!', 'error');
    }
  };

  const updateUser = async (updates) => {
    try {
      await axios({
        method: 'PATCH',
        url: `${process.env.SERVER_URL}/api/v1/users`,
        withCredentials: true,
        data: updates,
      }).then((res) => {
        showAlert('Account updated successfully!', 'success');
      });
    } catch (err) {
      showAlert('Something went wrong!', 'error');
    }
  };

  const value = {
    userAppointments,
    deleteAppointment,
    updateAppointment,
    updateUser,
  };

  return <UserContext.Provider value={value} {...props} />;
}

export { UserContext, UserProvider };
