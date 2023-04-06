import React from 'react';
import { createUseStyles } from 'react-jss';
import { DateTime } from 'luxon';
import { useNavigate } from 'react-router-dom';

const useStyles = createUseStyles({
  eventCard: {
    marginRight: '15px',
    //fontFamily: "'Clicker Script', cursive",
    //fontSize: '30px',
    width: '180px',
    padding: '10px',
    textAlign: 'center',
    textShadow: '#e5d7d7 1px 0px 5px',
    color: 'white',
    //background:
    //  'radial-gradient(ellipse at top, rgba(64, 69, 178, .92), transparent), radial-gradient(ellipse at bottom, rgba(56, 17, 17, .85), transparent)',
    backgroundImage:
      'radial-gradient(ellipse at top, rgba(64, 69, 178, .45), transparent), radial-gradient(ellipse at bottom, rgba(56, 17, 17, .45), transparent), url("Meditation Violet.jpg")',
    backgroundSize: 'cover',
    borderRadius: '30px',
    border: 'none',
    filter: 'drop-shadow(2px 2px 1px #443356)',
    cursor: 'pointer',
  },
});

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const classes = useStyles();

  const onClick = () => {
    navigate(`/events/${event._id}`);
  };

  return (
    <div className={classes.eventCard} onClick={onClick}>
      <h3>{event.name}</h3>
      <p>
        {DateTime.fromISO(event.start).toLocaleString(DateTime.DATETIME_FULL)}
      </p>
      <p>Spots Available: {event.capacity.available}</p>
    </div>
  );
};

export default EventCard;
