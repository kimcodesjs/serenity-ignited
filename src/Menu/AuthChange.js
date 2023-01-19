import React, { useEffect } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  authMessage: {
    width: '90%',
    marginTop: '100px',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    opacity: 0,
    transition: 'opacity 2s',
  },
  h2: {
    textShadow: '#e5d7d7 1px 0px 5px',
  },
  img: {
    width: '75%',
    height: 'auto',
  },
});

const formatDisplayName = (user) => user.name.split(' ')[0];

const AuthChange = ({ user, display, setDisplay }) => {
  const classes = useStyles();

  useEffect(() => {
    const message = document.getElementById('auth-message');
    if (display === 'auth-change') {
      message.style.opacity = 1;
    }
    setTimeout(() => {
      message.style.opacity = 0;
      setDisplay('nav-menu');
    }, 3000);
  }, [display]);

  return (
    <>
      <div className={classes.authMessage} id="auth-message">
        {user ? (
          <h2 className={classes.h2}>Welcome, {formatDisplayName(user)}!</h2>
        ) : (
          <h2 className={classes.h2}>Until next time...</h2>
        )}
        <img src="/Chakra Mandala.png" className={classes.img} />
      </div>
    </>
  );
};

export default AuthChange;
