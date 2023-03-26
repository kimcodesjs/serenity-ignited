import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import axios from 'axios';
import { DateTime } from 'luxon';

const useStyles = createUseStyles({
  container: {
    height: '100vh',
    width: '100vw',
    background:
      'radial-gradient(ellipse at top left, rgba(64, 69, 178, .92), transparent), radial-gradient(ellipse at bottom right, rgba(64, 69, 178, .92), transparent), url("clouds 3.jpg")',
    backgroundSize: 'cover',
  },
  pageTitle: {
    width: '350px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '0px',
    marginTop: '0px',
    paddingTop: '20px',
    borderRadius: '20px',
    fontFamily: "'Euphoria Script', cursive",
    fontSize: '65px',
    color: 'white',
    textAlign: 'center',
    textShadow: '#381111 1px 0px 20px',
    //background: 'radial-gradient(ellipse at top, rgba(232, 232, 185, .92) 1%, transparent), radial-gradient(ellipse at bottom, rgba(232, 232, 185, .92), transparent)',
    filter: 'drop-shadow(2px 2px 1px #4045b2)',
    '@media (max-width: 450px)': {
      fontSize: '45px',
    },
  },
  cardContainer: {
    display: 'flex',
    flexFlow: 'row',
  },
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
  pageSubtitle: {
    width: '100%',
    marginTop: '0px',
    marginBottom: '0px',
    fontFamily: "'Euphoria Script', cursive",
    textAlign: 'center',
    fontSize: '40px',
    '@media (max-width: 450px)': {
      fontSize: '30px',
      textAlign: 'center',
    },
  },
  moduleSubtitle: {
    marginBottom: '0',
  },
  moduleText: {
    width: '100%',
    textAlign: 'justify',
    flexGrow: 2,
    fontSize: '18px',
    margin: 0,
    '@media (max-width: 450px)': {
      width: '100%',
      fontSize: '15px',
    },
  },
});
const Events = () => {
  const [events, setEvents] = useState({ meditations: [], workshops: [] });

  const classes = useStyles();
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        await axios({
          method: 'GET',
          url: 'http://127.0.0.1:3000/api/v1/events/get-all-events',
        }).then((res) => {
          const meditationEvents = [];
          const workshopEvents = [];
          res.data.data.forEach((event) => {
            event.category === 'meditation'
              ? meditationEvents.push(event)
              : workshopEvents.push(event);
          });
          setEvents({
            meditations: meditationEvents,
            workshops: workshopEvents,
          });
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className={classes.container}>
      <h1 className={classes.pageTitle}>Events</h1>
      <h2 className={classes.pageSubtitle}>
        Select an event to see the full description and reserve your spot!
      </h2>
      <div>
        <h2>Meditations</h2>
        <div className={classes.cardContainer}>
          {events.meditations.map((event) => {
            return (
              <div className={classes.eventCard} key={event._id}>
                <h3>{event.name}</h3>
                <p>
                  {DateTime.fromISO(event.start).toLocaleString(
                    DateTime.DATETIME_FULL
                  )}
                </p>
                <p>Spots Available: {event.capacity.available}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h2>Workshops</h2>
        <p>
          We are still working on bringing workshops to Serenity Ignited! Is
          there something particular you are looking for? Let us know!
        </p>
      </div>
    </div>
  );
};

export default Events;
