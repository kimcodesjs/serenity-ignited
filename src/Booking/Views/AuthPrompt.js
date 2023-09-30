import React from 'react';
import AuthForm from '../../Auth/AuthForm';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  viewContainer: {
    height: '87vh',
    width: '70%',
    maxWidth: '800px',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    overflowX: 'hidden',
    '@media (max-width: 425px)': {
      width: '90%',
    },
  },
  viewPrompt: {
    marginBottom: '0',
    '@media (max-width: 920px)': {
      fontSize: '24px',
      // marginLeft: '70px',
      // marginRight: '70px',
    },
  },
  authContainer: {
    marginTop: '50px',
  },
});
const AuthPrompt = () => {
  const classes = useStyles();

  return (
    <div className={classes.viewContainer}>
      <h1 className={classes.viewPrompt}>
        Sign in to continue finalizing your appointment:
      </h1>
      <br />
      <div className={classes.authContainer}>
        <AuthForm />
      </div>
    </div>
  );
};

export default AuthPrompt;
