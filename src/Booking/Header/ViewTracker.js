import React, { useState, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { Transition } from 'react-transition-group';

const useStyles = createUseStyles({
  viewTracker: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    background:
      'radial-gradient(ellipse at top, rgba(232, 232, 185, .92) 1%, transparent), radial-gradient(ellipse at bottom, rgba(185, 221, 232, .92), transparent)',
    borderRadius: '0% 0% 70% 70%',
    width: '100%',
    height: '12.5vh',
    filter: 'drop-shadow(2px 2px 1px #4045b2)',
    zIndex: 5,
    transition: 'top ease-in-out 1s',
    overflow: 'hidden',
    '@media (max-width: 300px)': {
      justifyContent: 'normal',
    },
  },
  viewTitle: {
    //filter: 'drop-shadow(2px 2px 1px #443356)',
    padding: '5px',
    paddingLeft: '10px',
    paddingRight: '10px',
    fontSize: '56px',
    fontFamily: "'Clicker Script', cursive",
    textShadow: '#e5d7d7 1px 0px 5px',
    background:
      'radial-gradient(ellipse at top, rgba(64, 69, 178, .92), transparent), radial-gradient(ellipse at bottom, rgba(56, 17, 17, 1), transparent)',
    filter: 'drop-shadow(2px 2px 1px #443356)',
    borderRadius: '30px',
    color: 'white',
    WebkitUserSelect: 'none' /* Safari */,
    MozUserSelect: 'none' /* Firefox */,
    msUserSelect: 'none' /* IE10+/Edge */,
    userSelect: 'none' /* Standard */,
    '@media (max-width: 1400px)': {
      fontSize: '46px',
    },
    '@media (max-width: 1000px)': {
      fontSize: '36px',
    },
    '@media (max-width: 300px)': {
      fontSize: '26px',
    },
  },
});

const arrowStyles = {
  margin: '10px',
  filter: 'drop-shadow(3px 2px 1px #443356)',
  fontSize: '36px',
  cursor: 'pointer',
  WebkitUserSelect: 'none' /* Safari */,
  MozUserSelect: 'none' /* Firefox */,
  msUserSelect: 'none' /* IE10+/Edge */,
  userSelect: 'none' /* Standard */,
  transition: 'color ease-in-out .5s',
  fill: 'rgb(64, 69, 178)',
};

const disabledArrowStyles = {
  margin: '10px',
  // filter: 'drop-shadow(2px 2px 1px #443356)',
  fontSize: '36px',
  WebkitUserSelect: 'none' /* Safari */,
  MozUserSelect: 'none' /* Firefox */,
  msUserSelect: 'none' /* IE10+/Edge */,
  userSelect: 'none' /* Standard */,
  fill: 'gray',
  transition: 'color ease-in .5s',
};

const ViewTracker = ({ view, updateView, allowNextView }) => {
  const classes = useStyles();
  const nodeRef = useRef(null);
  const onArrowClick = (e) => {
    if (e.target.id === 'previous-view' && view !== 1 && view !== 5) {
      updateView(view - 1);
    } else if (e.target.id === 'next-view' && allowNextView && view !== 5) {
      updateView(view + 1);
    }
  };

  const transitionStyles = {
    entering: { top: '-12.5vh' },
    entered: { top: 0 },
    exiting: { top: '-12.5vh' },
    exited: { top: '-12.5vh' },
  };

  return (
    <Transition
      in={view === null ? false : true}
      timeout={1000}
      appear={true}
      nodeRef={nodeRef}
    >
      {(state) => (
        <div
          className={classes.viewTracker}
          style={{ ...transitionStyles[state] }}
        >
          <img
            data-testid="arrow-back"
            style={view === 1 || view === 5 ? disabledArrowStyles : arrowStyles}
            id="previous-view"
            onClick={onArrowClick}
            role="button"
            aria-pressed="false"
            src={
              view === 1 || view === 5
                ? 'arrow_back_disabled.svg'
                : 'arrow_back_enabled.svg'
            }
          />
          {view === 1 && <h1 className={classes.viewTitle}>Session</h1>}
          {view === 2 && <h1 className={classes.viewTitle}>Connection</h1>}
          {view === 3 && <h1 className={classes.viewTitle}>Schedule</h1>}
          {view === 4 && <h1 className={classes.viewTitle}>Confirm</h1>}
          {view === 5 && <h1 className={classes.viewTitle}>Thank You!</h1>}
          <img
            data-testid="arrow-forward"
            style={allowNextView ? arrowStyles : disabledArrowStyles}
            id="next-view"
            onClick={onArrowClick}
            role="button"
            aria-pressed="false"
            src={
              allowNextView
                ? 'arrow_forward_enabled.svg'
                : 'arrow_forward_disabled.svg'
            }
          />
        </div>
      )}
    </Transition>
  );
};

export default ViewTracker;
