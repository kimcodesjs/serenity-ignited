import React, { useEffect } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  authMessage: {
    position: 'absolute',
    top: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    //marginTop: '50px',
    //marginLeft: '-200px',
    width: '100%',
    height: '100px',
    textAlign: 'center',
    transition: 'opacity ease-in-out 1s',
  },
  h2: {
    marginBottom: '0px',
    fontFamily: "'Clicker Script', cursive",
    fontSize: '65px',
    color: 'white',
    textShadow: '#e5d7d7 1px 0px 5px',
    filter: 'drop-shadow(2px 2px 1px #443356)',
    '@media (max-width: 450px)': {
      fontSize: '55px',
    },
  },
  img: {
    width: '50%',
    height: 'auto',
  },
});

const AuthChange = ({ firstName, style }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.authMessage} id="auth-message" style={style}>
        <h2 className={classes.h2}>Welcome, {firstName}!</h2>
      </div>
    </>
  );
};

export default AuthChange;
