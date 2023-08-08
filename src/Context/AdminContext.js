import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { showAlert } from '../alert';

const AdminContext = createContext(null);

function AdminProvider(props) {
  const [practitionerData, setData] = useState(null);
  // workingHours is included in practitionerData,
  // separated out for the components that only need the hours
  const [workingHours, setWorkingHours] = useState(null);

  useEffect(() => {
    const getPractitionerData = async () => {
      try {
        await axios({
          method: 'GET',
          url: `http://127.0.0.1:3000/api/v1/practitioners/6487bb6d6cd84d6d6859954c`,
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
        url: `http://127.0.0.1:3000/api/v1/practitioners/6487bb6d6cd84d6d6859954c`,
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
  const value = {
    practitionerData,
    workingHours,
    updatePractitionerData,
  };

  return <AdminContext.Provider value={value} {...props} />;
}

export { AdminContext, AdminProvider };
