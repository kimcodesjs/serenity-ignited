import React, { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import Greeting from './Greeting';
import ViewTracker from './ViewTracker';

const useStyles = createUseStyles({
  header: {
    position: 'sticky',
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
    background:
      'linear-gradient(to bottom, rgba(56, 17, 17, .72), rgba(60, 23, 89, .0))',
    borderRadius: '0% 0% 0% 0%',
    zIndex: 3,
    transition: 'all ease-in-out 1.5s',
  },
});

const BookingHeader = ({ updateView, view, allowNextView }) => {
  const classes = useStyles();

  useEffect(() => {
    const header = document.getElementById('header');

    if (view !== null) {
      header.style.height = '12vh';
      header.style.flexDirection = 'row';
    }
  }, [view]);

  return (
    <>
      <div className={classes.header} id="header">
        {view === null && <Greeting updateView={updateView} />}
        {view !== null && (
          <ViewTracker
            view={view}
            updateView={updateView}
            allowNextView={allowNextView}
          />
        )}
      </div>
    </>
  );
};

export default BookingHeader;
