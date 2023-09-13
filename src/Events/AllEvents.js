import React from 'react';
import EventCard from './EventCard';
import { createUseStyles } from 'react-jss';
import { useOutletContext } from 'react-router-dom';

const useStyles = createUseStyles({
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
  cardContainer: {
    display: 'flex',
    flexFlow: 'row',
  },
});
const AllEvents = () => {
  const classes = useStyles();
  const events = useOutletContext();
  return (
    <>
      <h2 className={classes.pageSubtitle}>
        Select an event to see the full description and reserve your spot!
      </h2>
      <div>
        <h2>Meditations</h2>
        <p className={classes.moduleSubtitle}>
          Coming together with the intention of cultivating inner peace and
          deepening our connection to Self, weekly guided meditations provide a
          communal and welcoming atmosphere for individuals seeking a sense of
          harmony within and without.
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
    </>
  );
};

export default AllEvents;
