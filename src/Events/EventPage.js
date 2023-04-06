import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DateTime } from 'luxon';
import axios from 'axios';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
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
  eventDetails: {
    maxWidth: '75%',
    margin: 'auto',
    paddingTop: '20px',
    textAlign: 'center',
  },
  eventTitle: {
    marginTop: 0,
  },
});

const EventPage = () => {
  const [event, setEvent] = useState({});

  let { eventId } = useParams();
  const classes = useStyles();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        await axios({
          method: 'GET',
          url: `http://127.0.0.1:3000/api/v1/events/${eventId}`,
        }).then((res) => {
          console.log(res.data.data);
          setEvent(res.data.data);
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchEvents();
  }, []);

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <>
      <div className={classes.eventDetails}>
        <h1 className={classes.eventTitle}>{event.name}</h1>
        <h2>{event.description}</h2>
        <h3>
          {DateTime.fromISO(event.start).toLocaleString(DateTime.DATETIME_FULL)}
        </h3>
        <h3>{currencyFormatter.format(event.price)}</h3>
      </div>
      <img src="../Chakra Mandala.png" className={classes.imgLeft} />
      <img src="../Chakra Mandala.png" className={classes.imgRight} />
    </>
  );
};

export default EventPage;
