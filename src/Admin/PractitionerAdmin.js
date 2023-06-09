import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import AvailabilityForm from './Forms/AvailabilityForm';
import NewPractitioner from './Forms/NewPractitioner';

import { DateTime, Interval, Info } from 'luxon';

const ReikiAdmin = () => {
  const [disabledDates, setDisabledDates] = useState(null);
  const [activePractitioner, setActivePractitioner] = useState('Becky');

  // useEffect -> fetch practitioners from db, map names to buttons

  const onClick = (e) => {
    if (e.target.innerHTML === 'New Practitioner') {
      setActivePractitioner(null);
    } else {
      setActivePractitioner(e.target.innerHTML);
    }
  };
  return <AvailabilityForm practitioner={activePractitioner} />;
};

export default ReikiAdmin;
