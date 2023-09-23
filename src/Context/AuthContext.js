import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { showAlert } from '../Utilities/alert';

const AuthContext = createContext(null);

function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getAuthStatus = async () => {
      try {
        await axios({
          method: 'GET',
          url: `${process.env.URL}/api/v1/users/get-auth-status`,
          withCredentials: true,
        }).then((res) => {
          if (res.status === 200) {
            setUser(res.data.data);
          }
        });
      } catch (err) {
        // console.log(err);
      }
    };
    getAuthStatus();
  }, []);

  const logout = async () => {
    try {
      const res = await axios({
        method: 'POST',
        url: `${process.env.URL}/api/v1/users/logout`,
        withCredentials: true,
      });
      if (res.data.status === 'success') {
        setUser(null);
        showAlert('Logged out successfully!', 'success');
        navigate('/');
      }
    } catch (err) {
      showAlert(err.response.data.message);
    }
  };

  const authChange = async (data, authType) => {
    try {
      await axios({
        method: 'POST',
        url: `${process.env.URL}/api/v1/users/${authType}`,
        withCredentials: true,
        data,
      }).then((res) => {
        setUser(res.data.user);
        location.pathname === '/login' &&
          setTimeout(() => navigate(-1, { replace: true }), 3000);
      });
    } catch (err) {
      showAlert(err.response.data.message, 'error');
    }
  };

  const value = {
    user,
    logout,
    authChange,
  };
  return <AuthContext.Provider value={value} {...props} />;
}

export { AuthContext, AuthProvider };
