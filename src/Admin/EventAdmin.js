import React, { useState, useContext } from 'react';
import { createUseStyles } from 'react-jss';

import EventForm from './Forms/EventForm';
import adminStyles from './adminStyles';

const useStyles = createUseStyles(adminStyles);

const EventAdmin = ({ activeEvent }) => {
  const classes = useStyles();
  // how will events be sorted?

  return (
    <div className={classes.sectionContainer}>
      <h2 className={classes.sectionTitle}>Manage Your Events</h2>

      <EventForm event={activeEvent} />
    </div>
  );
};

export default EventAdmin;
