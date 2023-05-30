import React, { useState, useContext, useRef } from 'react';
import AuthForm from './AuthForm';
import { createUseStyles } from 'react-jss';
import { Transition } from 'react-transition-group';
import { AuthContext } from '../Context/AuthContext';
import AuthChange from './AuthChange';

const useStyles = createUseStyles({
  container: {
    height: '100vh',
    width: '100vw',
    backgroundImage:
      'linear-gradient(to bottom, rgba(56, 17, 17, .72), rgba(60, 23, 89, .0))',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    zIndex: '-2',
    maskImage: 'linear-gradient(black 10%, transparent)',
  },
  foreground: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    zIndex: '-1',
    opacity: '.6',
    maskImage: 'linear-gradient(black 10%, transparent)',
  },
  logo: {
    //position: 'absolute',
    marginBottom: '50px',
    filter: 'drop-shadow(5px 5px 1px #443356)',
    width: '200px',
    height: 'auto',
    marginTop: '50px',
    '@media (max-width: 400px)': {
      width: '175px',
      height: 'auto',
      top: '0vh',
    },
  },
});
const Authentication = () => {
  const classes = useStyles();
  const nodeRef = useRef(null);
  const { user } = useContext(AuthContext);

  const transitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };
  return (
    <div className={classes.container}>
      <img src="/4.png" className={classes.background} id="stars-back" />
      <img src="/2.png" className={classes.foreground} id="stars-front" />
      <img src="/logo-no-text.png" className={classes.logo} id="logo" />

      <Transition
        in={user === null ? true : false}
        timeout={1000}
        appear={true}
        nodeRef={nodeRef}
        // unmountOnExit={true}
      >
        {(state) => <AuthForm style={{ ...transitionStyles[state] }} />}
      </Transition>
      {user !== null && (
        <Transition
          in={user === null ? false : true}
          timeout={1000}
          appear={true}
          nodeRef={nodeRef}
        >
          {(state) => (
            <AuthChange user={user} style={{ ...transitionStyles[state] }} />
          )}
        </Transition>
      )}
    </div>
  );
};

export default Authentication;
