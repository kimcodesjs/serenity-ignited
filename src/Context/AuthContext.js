import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { showAlert } from '../alert';

const AuthContext = createContext(null);

function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getAuthStatus = async () => {
      try {
        await axios({
          method: 'GET',
          url: `http://127.0.0.1:3000/api/v1/users/get-auth-status`,
          withCredentials: true,
        }).then((res) => {
          if (res.status === 200) {
            setUser(res.data.data);
          }
        });
      } catch (err) {
        console.log(err);
      }
    };
    getAuthStatus();
  }, []);

  const logout = async () => {
    try {
      const res = await axios({
        method: 'POST',
        url: 'http://127.0.0.1:3000/api/v1/users/logout',
        withCredentials: true,
      });
      if (res.data.status === 'success') {
        setUser(null);
        showAlert('Logged out successfully!');
        navigate('/');
      }
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const signup = async (data) => {
    try {
      await axios({
        method: 'POST',
        url: `http://127.0.0.1:3000/api/v1/users/signup`,
        withCredentials: true,
        data,
      }).then((res) => {
        showAlert('Success!');
        setUser(res.data.user);
        navigate(-1, { replace: true });
      });
    } catch (err) {
      console.log(err);
    }
  };

  const login = async (data) => {
    try {
      await axios({
        method: 'POST',
        url: `http://127.0.0.1:3000/api/v1/users/login`,
        withCredentials: true,
        data,
      }).then((res) => {
        showAlert('Success!');
        setUser(res.data.user);
        navigate(-1, { replace: true });
      });
    } catch (err) {
      console.log(err);
    }
  };

  const value = {
    user,
    logout,
    login,
    signup,
  };
  return <AuthContext.Provider value={value} {...props} />;
}

export { AuthContext, AuthProvider };
