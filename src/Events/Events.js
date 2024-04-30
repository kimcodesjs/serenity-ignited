import React, { useRef, useContext } from 'react';
import { EventContext } from '../Context/EventContext';
import Header from '../SharedComponents/Header';
import { Transition } from 'react-transition-group';
import { Outlet } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    height: '100vh',
    width: '100vw',
    // background:
    //   'radial-gradient(ellipse at top left, rgba(64, 69, 178, .92), transparent), radial-gradient(ellipse at bottom right, rgba(64, 69, 178, .92), transparent), url("clouds 3.jpg")',
    // backgroundSize: 'cover',
  },
  imgRight: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    width: '25%',
    height: 'auto',
    transform: 'rotateY(180deg)',
    zIndex: 3,
    '@media (max-width: 800px)': {
      display: 'none',
    },
  },
  imgLeft: {
    position: 'absolute',
    bottom: 0,
    left: 10,
    width: '25%',
    height: 'auto',
    zIndex: 3,
    '@media (max-width: 800px)': {
      display: 'none',
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    marginLeft: '30px',
    marginRight: '30px',
    transition: 'opacity ease-in-out 1s',
    '@media (max-width: 800px)': {
      paddingTop: '10vh',
    },
    '@media (max-width: 450px)': {
      paddingTop: '15vh',
    },
  },
});
const Events = () => {
  const { workshops, meditations } = useContext(EventContext);
  const classes = useStyles();

  const nodeRef = useRef(null);

  const contentTransitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };
  return (
    <div className={classes.container}>
      <Header title="Events" />
      <Transition in={true} timeout={1000} appear={true} nodeRef={nodeRef}>
        {(state) => (
          <div
            className={classes.content}
            style={{ ...contentTransitionStyles[state] }}
          >
            <Outlet context={{ meditations, workshops }} />
          </div>
        )}
      </Transition>
      <img src="/Chakra Mandala.png" className={classes.imgLeft} />
      <img src="/Chakra Mandala.png" className={classes.imgRight} />
    </div>
  );
};

export default Events;
