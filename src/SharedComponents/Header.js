import React, { useRef } from 'react';
import { Transition } from 'react-transition-group';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  header: {
    //position: 'absolute',
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
});

const Header = ({ title }) => {
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

  return (
    <Transition in={true} timeout={1000} appear={true} nodeRef={nodeRef}>
      {(state) => (
        <div
          className={classes.header}
          style={{ ...headerTransitionStyles[state] }}
        >
          <h1 className={classes.headerTitle}>{title}</h1>
        </div>
      )}
    </Transition>
  );
};

export default Header;
