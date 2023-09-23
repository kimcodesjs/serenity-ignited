import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { showAlert } from '../Utilities/alert';

const useStyles = createUseStyles({
  form: {
    width: '100%',
    height: '100%',
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
});

const ResetPassword = () => {
  const classes = useStyles();

  const [error, setError] = useState('');
  let { token } = useParams();
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const password = document.getElementById('password-input').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    if (password === passwordConfirm) {
      setError(null);
      try {
        const res = await axios({
          method: 'PATCH',
          url: `http://127.0.0.1:3000/api/v1/users/resetPassword/${token}`,
          data: {
            password,
            passwordConfirm,
          },
        });
        res.data.status === 'success' && navigate('/');
      } catch (err) {
        // console.log(err);
      }
    } else {
      setError('Passwords must match.');
    }
  };
  return (
    <div>
      <form className={classes.form}>
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
        <br />
        <button className={classes.button} onClick={handleFormSubmit}>
          Submit
        </button>
      </form>
      {error ? <span className={classes.error}>{error}</span> : null}
    </div>
  );
};

export default ResetPassword;
