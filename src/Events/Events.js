import React, { useState, useEffect } from 'react';
import { Transition } from 'react-transition-group';
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
  header: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    background:
      'radial-gradient(ellipse at top, rgba(64, 69, 178, .92) 1%, transparent), radial-gradient(ellipse at bottom, rgba(56, 17, 17, .92), transparent)',
    borderRadius: '0% 0% 70% 70%',
    width: '100%',
    height: '12.5vh',
    filter: 'drop-shadow(2px 2px 1px #4045b2)',
    zIndex: 1,
    transition: 'all ease-in-out 1s',
    overflow: 'hidden',
    '@media (max-width: 300px)': {
      justifyContent: 'normal',
    },
  },
  headerTitle: {
    //filter: 'drop-shadow(2px 2px 1px #443356)',
    padding: '5px',
    paddingLeft: '10px',
    paddingRight: '10px',
    fontSize: '60px',
    fontFamily: "'Clicker Script', cursive",
    textShadow: '#e5d7d7 1px 0px 5px',
    //background:
    //'radial-gradient(ellipse at top, rgba(232, 232, 185, .92), transparent), radial-gradient(ellipse at bottom, rgba(56, 17, 17, 1), transparent)',
    filter: 'drop-shadow(2px 2px 1px #443356)',
    borderRadius: '30px',
    color: 'white',
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    marginLeft: '30px',
    marginRight: '30px',
    transition: 'opacity ease-in-out 1s',
    '@media (max-width: 800px)': {
      paddingTop: '10vh',
    },
    '@media (max-width: 450px)': {
      paddingTop: '12vh',
    },
  },
  // pageTitle: {
  //   width: '350px',
  //   marginLeft: 'auto',
  //   marginRight: 'auto',
  //   marginBottom: '0px',
  //   marginTop: '0px',
  //   paddingTop: '20px',
  //   borderRadius: '20px',
  //   fontFamily: "'Euphoria Script', cursive",
  //   fontSize: '65px',
  //   //color: 'white',
  //   textAlign: 'center',
  //   textShadow: '#381111 1px 0px 20px',
  //   //background: 'radial-gradient(ellipse at top, rgba(232, 232, 185, .92) 1%, transparent), radial-gradient(ellipse at bottom, rgba(232, 232, 185, .92), transparent)',
  //   filter: 'drop-shadow(2px 2px 1px #4045b2)',
  //   '@media (max-width: 450px)': {
  //     fontSize: '45px',
  //   },
  // },

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

  const headerTransitionStyles = {
    entering: {
      top: '-12.5vh',
      backgroundColor: 'rgb(232, 232, 185)',
    },
    entered: {
      top: 0,
      backgroundColor: 'rgb(64, 69, 178)',
    },
    exiting: {
      top: '-12.5vh',
      backgroundColor: 'rgb(232, 232, 185)',
    },
    exited: {
      top: '-12.5vh',
      backgroundColor: 'rgb(232, 232, 185)',
    },
  };

  const contentTransitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };
  return (
    <div className={classes.container}>
      <Transition in={true} timeout={1000} appear={true}>
        {(state) => (
          <div
            className={classes.header}
            style={{ ...headerTransitionStyles[state] }}
          >
            <h1 className={classes.headerTitle}>Events</h1>
          </div>
        )}
      </Transition>
      <Transition in={true} timeout={1000} appear={true}>
        {(state) => (
          <div
            className={classes.content}
            style={{ ...contentTransitionStyles[state] }}
          >
            <h2 className={classes.pageSubtitle}>
              Select an event to see the full description and reserve your spot!
            </h2>
            <div>
              <h2>Meditations</h2>
              <p className={classes.moduleSubtitle}>
                Coming together with the intention of cultivating inner peace
                and deepening our connection to Self, weekly guided meditations
                provide a communal and welcoming atmosphere for individuals
                seeking a sense of harmony within and without.
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
                We are still working on bringing workshops to Serenity Ignited!
                Is there something particular you are looking for? Let us know!
              </p>
            </div>
          </div>
        )}
      </Transition>
      <img src="Chakra Mandala.png" className={classes.imgLeft} />
      <img src="Chakra Mandala.png" className={classes.imgRight} />
    </div>
  );
};

export default Events;
