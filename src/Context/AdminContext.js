import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { showAlert } from '../Utilities/alert';

const AdminContext = createContext(null);

function AdminProvider(props) {
  const [practitionerData, setData] = useState(null);
  const [workingHours, setWorkingHours] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const getPractitionerData = async () => {
      try {
        await axios({
          method: 'GET',
          url: `${process.env.URL}/api/v1/practitioners/6487bb6d6cd84d6d6859954c`,
        }).then((res) => {
          setData(res.data.data);
          setWorkingHours(res.data.data.workingHours);
        });
      } catch (err) {
        // console.log(err);
      }
    };
    getPractitionerData();
  }, []);

  const updatePractitionerData = async (updates) => {
    try {
      await axios({
        method: 'PATCH',
        url: `${process.env.URL}/api/v1/practitioners/6487bb6d6cd84d6d6859954c`,
        withCredentials: true,
        data: updates,
      }).then((res) => {
        setData(res.data.data);
        setWorkingHours(res.data.data.workingHours);
      });
    } catch (err) {
      showAlert(err.response.data.message, 'error');
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        await axios({
          method: 'GET',
          url: `${process.env.URL}/api/v1/appointments/get-all-admin`,
          withCredentials: true,
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
    practitionerData,
    workingHours,
    updatePractitionerData,
    appointments,
  };

  return <AdminContext.Provider value={value} {...props} />;
}

export { AdminContext, AdminProvider };
