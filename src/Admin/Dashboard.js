import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import Overview from './Overview';
import AvailabilityForm from './Forms/AvailabilityForm';
import EventAdmin from './EventAdmin';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    //justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    //position: 'absolute',
    //top: '0',
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
    //filter: 'drop-shadow(2px 2px 1px #443356)',
    // padding: '5px',
    // paddingLeft: '10px',
    // paddingRight: '10px',
    fontSize: '60px',
    fontFamily: "'Clicker Script', cursive",
    textShadow: '#e5d7d7 1px 0px 5px',
    //background:
    //'radial-gradient(ellipse at top, rgba(232, 232, 185, .92), transparent), radial-gradient(ellipse at bottom, rgba(56, 17, 17, 1), transparent)',
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
  const [active, setActive] = useState('events');

  const classes = useStyles();

  const onClick = (e) => {
    if (e.target.innerHTML === 'Overview' && active !== 'overview') {
      setActive('overview');
    } else if (
      e.target.innerHTML === 'Availability' &&
      active !== 'availability'
    ) {
      setActive('availability');
    } else if (e.target.innerHTML === 'Events' && active !== 'events') {
      setActive('events');
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
      {active === 'overview' ? <Overview /> : null}
      {active === 'availability' ? <AvailabilityForm /> : null}
      {active === 'events' ? <EventAdmin /> : null}
    </div>
  );
};

export default Dashboard;
