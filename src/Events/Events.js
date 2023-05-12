import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import axios from 'axios';
import { DateTime } from 'luxon';
import EventCard from './EventCard';

const useStyles = createUseStyles({
  container: {
    height: '100vh',
    width: '100vw',
    // background:
    //   'radial-gradient(ellipse at top left, rgba(64, 69, 178, .92), transparent), radial-gradient(ellipse at bottom right, rgba(64, 69, 178, .92), transparent), url("clouds 3.jpg")',
    // backgroundSize: 'cover',
  },
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
  content: {
    maxWidth: '75%',
    margin: 'auto',
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
    //color: 'white',
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
    margin: '0',
    maxWidth: '700px',
    fontSize: '20px',
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
          console.log(res.data.data);
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
      <div className={classes.content}>
        <h1 className={classes.pageTitle}>Events</h1>
        <h2 className={classes.pageSubtitle}>
          Select an event to see the full description and reserve your spot!
        </h2>
        <div>
          <h2>Meditations</h2>
          <p className={classes.moduleSubtitle}>
            Coming together with the intention of cultivating inner peace and
            deepening our connection to Self, weekly guided meditations provide
            a communal and welcoming atmosphere for individuals seeking a sense
            of harmony within and without.
          </p>
          <br />
          <div className={classes.cardContainer}>
            {events.meditations.length === 0 && <h3></h3>}
            {events.meditations.map((event) => {
              return <EventCard event={event} key={event._id} />;
            })}
          </div>
        </div>
        <div>
          <h2>Workshops</h2>
          <p className={classes.moduleSubtitle}>
            We are still working on bringing workshops to Serenity Ignited! Is
            there something particular you are looking for? Let us know!
          </p>
        </div>
      </div>
      <img src="Chakra Mandala.png" className={classes.imgLeft} />
      <img src="Chakra Mandala.png" className={classes.imgRight} />
    </div>
  );
};

export default Events;
