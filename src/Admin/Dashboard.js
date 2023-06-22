import React, { useState, useContext } from 'react';
import { createUseStyles } from 'react-jss';
import { DateTime } from 'luxon';
import Overview from './Overview';
import AvailabilityForm from './Forms/AvailabilityForm';
import EventAdmin from './EventAdmin';
import { EventContext } from '../Context/EventContext';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    background:
      'radial-gradient(ellipse at top, rgba(64, 69, 178, .92) 1%, transparent), radial-gradient(ellipse at bottom, rgba(56, 17, 17, .92), transparent)',
    borderRadius: '0% 0% 100% 100%',
    width: '100%',
    height: '12.5vh',
    filter: 'drop-shadow(2px 2px 1px #4045b2)',
    zIndex: 1,
    transition: 'all ease-in-out 1s',
    '@media (max-width: 300px)': {
      justifyContent: 'normal',
    },
  },
  headerTitle: {
    fontSize: '60px',
    fontFamily: "'Clicker Script', cursive",
    textShadow: '#e5d7d7 1px 0px 5px',
    filter: 'drop-shadow(2px 2px 1px #443356)',
    borderRadius: '30px',
    color: 'white',
    margin: 'auto',
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
  adminMenu: {
    paddingTop: '20px',
    justifyContent: 'center',
  },
  menuButton: {
    fontSize: '20px',
    margin: '5px',
    borderRadius: '10px',
  },
});

const Dashboard = () => {
  const [activeView, setActiveView] = useState('overview');
  const [activeEvent, setActiveEvent] = useState(null);
  const { meditations, workshops } = useContext(EventContext);

  const classes = useStyles();

  const onClick = (e) => {
    if (e.target.innerHTML === 'Overview' && activeView !== 'overview') {
      setActiveView('overview');
    } else if (
      e.target.innerHTML === 'Availability' &&
      activeView !== 'availability'
    ) {
      setActiveView('availability');
    } else if (e.target.innerHTML === 'Events' && activeView !== 'events') {
      setActiveEvent(null);
      setActiveView('events');
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h1 className={classes.headerTitle}>Admin Dashboard</h1>
      </div>
      <div className={classes.adminMenu}>
        <button className={classes.menuButton} onClick={onClick}>
          Overview
        </button>
        <button className={classes.menuButton} onClick={onClick}>
          Availability
        </button>
        <button className={classes.menuButton} onClick={onClick}>
          Events
        </button>
      </div>
      {activeView === 'overview' && (
        <Overview
          setActiveView={setActiveView}
          setActiveEvent={setActiveEvent}
          meditations={meditations}
          workshops={workshops}
        />
      )}
      {activeView === 'availability' && <AvailabilityForm />}
      {activeView === 'events' && <EventAdmin activeEvent={activeEvent} />}
    </div>
  );
};

export default Dashboard;
