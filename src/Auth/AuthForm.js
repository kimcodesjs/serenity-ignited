import React, { useState, useEffect, useContext } from 'react';
import { createUseStyles } from 'react-jss';
import axios from 'axios';
import UserInfoForm from './UserInfoForm';
import { AuthContext } from '../Context/AuthContext';
import { showAlert } from '../alert';
import { useLocation } from 'react-router-dom';

const useStyles = createUseStyles({
  authContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formItem: {
    width: '60%',
  },
  inputLabel: {
    textShadow: '#e5d7d7 1px 0px 5px',
  },
  input: {
    backgroundColor: 'transparent',
    borderColor: '#381111',
    borderLeft: 'none',
    borderRight: 'none',
    borderTop: 'none',
    borderRadius: '10px',
    paddingLeft: '10px',
    outline: 'none',
    fontFamily: 'inherit',
  },
  button: {
    width: '10%',
    marginBottom: '10px',
    border: 'none',
    padding: '0',
    userSelect: 'none',
    cursor: 'pointer',
    background: 'transparent',
    textShadow: '#e5d7d7 1px 0px 5px',
    filter: 'drop-shadow(2px 2px 1px #443356)',
    borderRadius: '10px',
    fontWeight: 'bold',
    fontFamily: 'inherit',
  },
  error: {
    marginLeft: '30px',
  },
});

const AuthForm = () => {
  const classes = useStyles();

  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const authFlow =
    useLocation().state !== null ? useLocation().state.authFlow : 'log-in';
  console.log(useLocation().state);

  const location = useLocation();
  console.log(location);
  const { login, signup } = useContext(AuthContext);

  useEffect(() => {
    const container = document.getElementById('authentication-form-container');
    container.style.opacity = '1';
  }, []);

  // New User Authentication
  const handleSignUp = async (e) => {
    e.preventDefault();
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    if (password === passwordConfirm) {
      if (error) {
        setError(null);
      }
      signup(email, password, passwordConfirm, userInfo);
    } else {
      setError('Passwords must match.');
    }
  };

  // Existing User Authentication
  const handleLogIn = async (e) => {
    e.preventDefault();

    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;
    login(email, password);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const email = document.getElementById('email-input').value;
    if (email === '') {
      setError('Please provide your email address');
      return;
    }
    try {
      const res = await axios({
        method: 'POST',
        url: `http://127.0.0.1:3000/api/v1/users/forgotPassword`,
        data: {
          email,
        },
      });
      (res.data.status === 'success') &
        showAlert(
          'Success! Check your email for a link to reset your password.'
        );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="authentication-form-container" className={classes.authContainer}>
      {authFlow === 'sign-up' && userInfo === null && (
        <UserInfoForm setUserInfo={setUserInfo} useStyles={useStyles} />
      )}
      {(authFlow === 'log-in' || userInfo != null) && (
        <form id="auth-form" className={classes.form}>
          <div className={classes.formItem}>
            <label className={classes.inputLabel} htmlFor="email-input">
              Email
            </label>
            <input
              className={classes.input}
              type="email"
              id="email-input"
              required
            />
          </div>
          <br />
          <div className={classes.formItem}>
            <label className={classes.inputLabel} htmlFor="password-input">
              Password
            </label>
            <input
              className={classes.input}
              type="password"
              id="password-input"
              required
            />
          </div>
          <br />
          {authFlow === 'sign-up' && (
            <div className={classes.formItem}>
              <label className={classes.inputLabel} htmlFor="password-confirm">
                Confirm Password
              </label>
              <input
                className={classes.input}
                type="password"
                id="password-confirm"
                required
              />
            </div>
          )}
          <br />
          <button
            className={classes.button}
            onClick={authFlow === 'sign-up' ? handleSignUp : handleLogIn}
          >
            Submit
          </button>
          <button className={classes.button} onClick={handleForgotPassword}>
            I forgot my password.
          </button>
          <br />
          {error ? <span className={classes.error}>{error}</span> : null}
        </form>
      )}
    </div>
  );
};

export default AuthForm;
