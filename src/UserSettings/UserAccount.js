import React, { useState, useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import { AuthContext } from '../Context/AuthContext';
import AppointmentCard from '../Booking/Views/AppointmentCard';
import Header from '../SharedComponents/Header';
import { DateTime, Interval } from 'luxon';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    width: '100vw',
    minHeight: '100vh',
  },
  mySessionsContent: {
    display: 'inline-flex',
    flexDirection: 'column',
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
  },
  apptCardContainer: {
    display: 'inline-flex',
    flexFlow: 'row wrap',
    width: '100%',
  },
  apptEditContainer: {
    width: '50%',
    background:
      'radial-gradient(ellipse at top, rgba(130, 150, 188, .7), transparent), radial-gradient(ellipse at bottom, rgba(130, 150, 188, .7), transparent)',
  },
});

const useAppointmentCardStyles = createUseStyles({
  appointmentCard: {
    margin: '20px',
    width: '400px',
    padding: '10px',
    background:
      'radial-gradient(ellipse at top, rgba(130, 150, 188, .7), transparent), radial-gradient(ellipse at bottom, rgba(130, 150, 188, .7), transparent)',
    textShadow: '#e5d7d7 1px 0px 5px',
    filter: 'drop-shadow(2px 2px 1px #443356)',
    userSelect: 'none',
  },
  h4: {
    margin: 0,
  },
  button: {
    marginRight: '25%',
    marginTop: '20px',
    width: '85px',
    textAlign: 'center',
    userSelect: 'none',
    cursor: 'pointer',
    background:
      'radial-gradient(ellipse at top, rgba(130, 150, 188, .7), transparent), radial-gradient(ellipse at bottom, rgba(130, 150, 188, .7), transparent)',
    textShadow: '#e5d7d7 1px 0px 5px',
    filter: 'drop-shadow(2px 2px 1px #443356)',
    borderRadius: '10px',
    fontWeight: 'bold',
  },
});
const UserAccount = () => {
  const { userAppointments } = useContext(UserContext);
  const { user } = useContext(AuthContext);

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Header title="My Account" />
      <div className={classes.mySessionsContent}>
        <div className={classes.apptCardContainer}>
          {userAppointments.length > 0 &&
            userAppointments.map((appointment) => {
              return (
                <AppointmentCard
                  key={appointment._id}
                  session={appointment.session}
                  connection={appointment.connection}
                  date={DateTime.fromISO(appointment.date)}
                  time={Interval.fromISO(appointment.time)}
                  useStyles={useAppointmentCardStyles}
                  onCancel={(e) => {
                    e.preventDefault();
                    onCancel(appointment.id);
                  }}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
