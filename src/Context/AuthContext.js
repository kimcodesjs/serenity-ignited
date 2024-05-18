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
          url: `${process.env.SERVER_URL}/api/v1/users/get-auth-status`,
          withCredentials: true,
        }).then((res) => {
          res.status === 200 ? setUser(res.data.data) : setUser(null);
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
        url: `${process.env.SERVER_URL}/api/v1/users/logout`,
        withCredentials: true,
      }).then((res) => {
        if (res.data.status === 'success') {
          setUser(null);
          showAlert('Logged out successfully!', 'success');
          navigate('/');
        }
      });
    } catch (err) {
      showAlert(err.response.data.message);
    }
  };

  const authChange = async (data, authType) => {
    try {
      await axios({
        method: 'POST',
        url: `${process.env.SERVER_URL}/api/v1/users/${authType}`,
        withCredentials: true,
        data,
      }).then((res) => {
        setUser(res.data.user);
        location.pathname === '/login' &&
          setTimeout(() => navigate(-1, { replace: true }), 3000);
      });
    } catch (err) {
      err.response.data.message !== undefined
        ? showAlert(err.response.data.message, 'error')
        : showAlert('Something went wrong...', 'error');
    }
  };

  const forgotPassword = async (email) => {
    try {
      await axios({
        method: 'POST',
        url: `${process.env.SERVER_URL}/api/v1/users/forgot-password`,
        data: {
          email,
        },
      }).then((res) => {
        (res.data.status === 'success') &
          showAlert(
            'Success! Check your email for a link to reset your password.',
            'success'
          );
      });
    } catch (err) {
      err.response.data.message !== undefined
        ? showAlert(err.response.data.message, 'error')
        : showAlert('Something went wrong...', 'error');
    }
  };
  const value = {
    user,
    logout,
    authChange,
    forgotPassword,
  };
  return <AuthContext.Provider value={value} {...props} />;
}

export { AuthContext, AuthProvider };
