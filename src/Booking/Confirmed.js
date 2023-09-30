import React from 'react';
import { Link } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  viewContainer: {
    height: '88vh',
    maxWidth: '700px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    overflowX: 'hidden',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  viewPrompt: {
    marginLeft: '10px',
    marginRight: '10px',
    '@media (max-width: 920px)': {
      fontSize: '24px',
      marginLeft: '20px',
      marginRight: '20px',
    },
  },
  logo: {
    filter: 'drop-shadow(5px 5px 1px #443356)',
    width: '200px',
    height: 'auto',
    '@media (max-width: 400px)': {
      width: '175px',
      height: 'auto',
      top: '0vh',
    },
  },
});

const Confirmed = ({ user }) => {
  const classes = useStyles();

  return (
    <div className={classes.viewContainer}>
      <h1 className={classes.viewPrompt}>
        Thank you for allowing me to join you on your healing journey,{' '}
        {user.firstName}!
      </h1>
      <h3>
        You will receive an email confirmation for your appointment that will
        include tips and recommendations to prepare you for your healing
        session. Please reach out if you don't receive one!
      </h3>
      <h3>
        Visit the <Link to={`/${user.uid}/my-sessions`}>My Sessions</Link> page
        to view your upcoming appointments and edit or reschedule if need be.
      </h3>
      <img src="/logo-no-text.png" className={classes.logo} id="logo" />
    </div>
  );
};

export default Confirmed;
