import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { showAlert } from '../alert';

const AdminContext = createContext(null);

function AdminProvider(props) {
  const [practitionerData, setData] = useState(null);

  useEffect(() => {
    const getPractitionerData = async () => {
      try {
        await axios({
          method: 'GET',
          url: `http://127.0.0.1:3000/api/v1/users/practitioner-data`,
          withCredentials: true,
        }).then((res) => {
          setData(res.data.data[0]);
        });
      } catch (err) {
        console.log(err);
      }
    };
    getPractitionerData();
  }, []);

  const updatePractitionerData = async (updates) => {
    try {
      await axios({
        method: 'PATCH',
        url: `http://127.0.0.1:3000/api/v1/users/practitioner-data`,
        withCredentials: true,
        updates,
      });
    } catch (err) {
      showAlert(err.response.data.message, 'error');
    }
  };
  const value = {
    practitionerData,
    updatePractitionerData,
  };

  return <AdminContext.Provider value={value} {...props} />;
}

export { AdminContext, AdminProvider };
