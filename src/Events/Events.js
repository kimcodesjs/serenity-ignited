import React, { useState, useEffect, useRef, useContext } from 'react';
import { EventContext } from '../Context/EventContext';
import { Transition } from 'react-transition-group';
import { Outlet } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import axios from 'axios';

const useStyles = createUseStyles({
  container: {
    height: '100vh',
    width: '100vw',
    // background:
    //   'radial-gradient(ellipse at top left, rgba(64, 69, 178, .92), transparent), radial-gradient(ellipse at bottom right, rgba(64, 69, 178, .92), transparent), url("clouds 3.jpg")',
    // backgroundSize: 'cover',
  },
  header: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    background:
      'radial-gradient(ellipse at top, rgba(64, 69, 178, .92) 1%, transparent), radial-gradient(ellipse at bottom, rgba(56, 17, 17, .92), transparent)',
    borderRadius: '0% 0% 100% 100%',
    width: '100%',
    height: '12.5vh',
    filter: 'drop-shadow(2px 2px 1px #4045b2)',
    zIndex: 1,
    transition: 'all ease-in-out 1s',
    overflow: 'hidden',
    '@media (max-width: 300px)': {
      justifyContent: 'normal',
    },
  },
  headerTitle: {
    //filter: 'drop-shadow(2px 2px 1px #443356)',
    padding: '5px',
    paddingLeft: '10px',
    paddingRight: '10px',
    fontSize: '60px',
    fontFamily: "'Clicker Script', cursive",
    textShadow: '#e5d7d7 1px 0px 5px',
    //background:
    //'radial-gradient(ellipse at top, rgba(232, 232, 185, .92), transparent), radial-gradient(ellipse at bottom, rgba(56, 17, 17, 1), transparent)',
    filter: 'drop-shadow(2px 2px 1px #443356)',
    borderRadius: '30px',
    color: 'white',
    '@media (max-width: 1400px)': {
      fontSize: '60px',
    },
    '@media (max-width: 1000px)': {
      fontSize: '46px',
    },
    '@media (max-width: 300px)': {
      fontSize: '26px',
    },
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
      paddingTop: '12vh',
    },
  },
});
const Events = () => {
  const { workshops, meditations } = useContext(EventContext);
  const classes = useStyles();

  const nodeRef = useRef(null);

  const headerTransitionStyles = {
    entering: {
      top: '-12.5vh',
      backgroundColor: 'rgb(232, 232, 185)',
    },
    entered: {
      top: 0,
      backgroundColor: 'rgb(64, 69, 178)',
    },
    exiting: {
      top: '-12.5vh',
      backgroundColor: 'rgb(232, 232, 185)',
    },
    exited: {
      top: '-12.5vh',
      backgroundColor: 'rgb(232, 232, 185)',
    },
  };

  const contentTransitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };
  return (
    <div className={classes.container}>
      <Transition in={true} timeout={1000} appear={true} nodeRef={nodeRef}>
        {(state) => (
          <div
            className={classes.header}
            style={{ ...headerTransitionStyles[state] }}
          >
            <h1 className={classes.headerTitle}>Events</h1>
          </div>
        )}
      </Transition>
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
