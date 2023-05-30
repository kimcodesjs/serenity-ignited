import React, { useState, useContext } from 'react';
import { createUseStyles } from 'react-jss';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import { showAlert } from '../alert';
import { useLocation } from 'react-router-dom';

const useStyles = createUseStyles({
  authContainer: {
    display: 'flex',
    flexDirection: 'column',
    //justifyContent: 'center',
    alignItems: 'center',
    //minHeight: '100vh',
    transition: 'opacity ease-in-out 1s',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    backgroundColor: 'white',
    borderColor: '#381111',
    borderLeft: 'none',
    borderRight: 'none',
    borderTop: 'none',
    borderRadius: '10px',
    paddingLeft: '10px',
    outline: 'none',
    fontFamily: 'inherit',
    fontSize: '20px',
    width: '275px',
  },
  button: {
    fontFamily: "'Clicker Script', cursive",
    fontSize: '30px',
    textShadow: '#e5d7d7 1px 0px 5px',
    color: 'white',
    background:
      'radial-gradient(ellipse at top, rgba(64, 69, 178, .92), transparent), radial-gradient(ellipse at bottom, rgba(56, 17, 17, 1), transparent)',
    borderRadius: '30px',
    border: 'none',
    filter: 'drop-shadow(2px 2px 1px #443356)',
    cursor: 'pointer',
    width: '100%',
    transition: 'opacity ease-in-out 1s',
    '@media (max-width: 720px)': {
      fontSize: '28px',
      //width: '140px',
    },
    '@media (max-width: 450px)': {
      fontSize: '28px',
      //width: '110px',
    },
  },
  textButton: {
    //width: '10%',
    margin: '10px',
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
    fontSize: '15px',
  },
  error: {
    fontSize: '20px',
  },
});

const AuthForm = ({ style }) => {
  const classes = useStyles();

  const [error, setError] = useState(null);
  const [authFlow, setAuthFlow] = useState(
    useLocation().state !== null ? useLocation().state.authFlow : 'log-in'
  );
  const { authChange } = useContext(AuthContext);

  // New User Authentication
  const handleSignUp = async (e) => {
    e.preventDefault();

    const data = {
      firstName: document.getElementById('first-name').value,
      lastName: document.getElementById('last-name').value,
      phone: document.getElementById('phone').value,
      email: document.getElementById('email-input').value,
      password: document.getElementById('password-input').value,
      passwordConfirm: document.getElementById('password-confirm').value,
    };

    if (data.password === data.passwordConfirm) {
      if (error) {
        setError(null);
      }
      authChange(data, 'signup');
    } else {
      setError('Passwords must match.');
    }
  };

  // Existing User Authentication
  const handleLogIn = async (e) => {
    e.preventDefault();
    const data = {
      email: document.getElementById('email-input').value,
      password: document.getElementById('password-input').value,
    };

    authChange(data, 'login');
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
    <div
      id="authentication-form-container"
      className={classes.authContainer}
      style={style}
    >
      <form id="auth-form" className={classes.form}>
        {authFlow === 'sign-up' && (
          <>
            <input
              type="text"
              className={classes.input}
              id="first-name"
              required
              placeholder="First Name"
            />
            <br />
            <input
              type="text"
              className={classes.input}
              id="last-name"
              required
              placeholder="Last Name"
            />
            <br />
            <input
              type="tel"
              className={classes.input}
              id="phone"
              required
              placeholder="Phone Number"
            />
            <br />
          </>
        )}
        <input
          className={classes.input}
          type="email"
          id="email-input"
          required
          placeholder="Email"
        />
        <br />
        <input
          className={classes.input}
          type="password"
          id="password-input"
          required
          placeholder="Password"
        />
        <br />
        {authFlow === 'sign-up' && (
          <>
            <input
              className={classes.input}
              type="password"
              id="password-confirm"
              placeholder="Confirm Password"
            />
            <br />
          </>
        )}
        <button
          className={classes.button}
          onClick={authFlow === 'sign-up' ? handleSignUp : handleLogIn}
        >
          Submit
        </button>
      </form>
      <div>
        <button className={classes.textButton} onClick={handleForgotPassword}>
          I forgot my password.
        </button>
        {authFlow === 'sign-up' ? (
          <button
            className={classes.textButton}
            onClick={() => setAuthFlow('log-in')}
          >
            I already have an account!
          </button>
        ) : (
          <button
            className={classes.textButton}
            onClick={() => setAuthFlow('sign-up')}
          >
            I don't have an account yet.
          </button>
        )}
      </div>
      <br />
      {error ? <span className={classes.error}>{error}</span> : null}
    </div>
  );
};

export default AuthForm;
