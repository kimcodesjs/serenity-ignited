import React from 'react';
import { Link } from 'react-router-dom';

const Confirmed = ({ user }) => {
  return (
    <div>
      <h3>
        Thank you for allowing me to join you on your healing journey,{' '}
        {user.firstName}! Here are some tips to keep in mind while preparing for
        your session.
      </h3>
      <h4>
        Please visit the{' '}
        <Link to={`/${user.uid}/my-sessions`}>My Sessions</Link> page to view
        your upcoming appointments and edit or reschedule if need be.
      </h4>
    </div>
  );
};

export default Confirmed;
