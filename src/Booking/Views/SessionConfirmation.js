import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { showAlert } from '../../Utilities/alert';
import axios from 'axios';
import AppointmentCard from './AppointmentCard';
import { Link } from 'react-router-dom';

const useStyles = createUseStyles({
  viewContainer: {
    height: '87vh',
    width: '70%',
    maxWidth: '800px',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    overflowX: 'hidden',
    '@media (max-width: 425px)': {
      width: '90%',
    },
  },
  viewPrompt: {
    marginBottom: '0',
    '@media (max-width: 920px)': {
      fontSize: '24px',
      // marginLeft: '70px',
      // marginRight: '70px',
    },
  },
  h3: {
    marginBottom: '5px',
  },
  p: {
    marginTop: '0',
    fontStyle: 'italic',
    fontSize: '15px',
    cursor: 'pointer',
    userSelect: 'none',
  },
  cardContainer: {
    filter: 'drop-shadow(2px 2px 1px #443356)',
    width: '300px',
    display: 'flex',
  },
  buttonEnabled: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '220px',
    fontFamily: "'Clicker Script', cursive",
    fontSize: '28px',
    textShadow: '#e5d7d7 1px 0px 5px',
    color: 'white',
    background:
      'radial-gradient(ellipse at top, rgba(64, 69, 178, .92), transparent), radial-gradient(ellipse at bottom, rgba(56, 17, 17, 1), transparent)',
    borderRadius: '30px',
    border: 'none',
    filter: 'drop-shadow(2px 2px 1px #443356)',
    cursor: 'pointer',
    transition: 'opacity ease-in-out 1s',
    '@media (max-width: 720px)': {
      fontSize: '28px',
    },
    '@media (max-width: 300px)': {
      fontSize: '20px',
    },
  },
  buttonDisabled: {
    marginTop: '30px',
    fontFamily: "'Clicker Script', cursive",
    fontSize: '24px',
    textShadow: '#e5d7d7 1px 0px 5px',
    color: 'white',
    background:
      'radial-gradient(ellipse at top, rgba(64, 69, 178, .92), transparent), radial-gradient(ellipse at bottom, rgba(56, 17, 17, 1), transparent)',
    borderRadius: '30px',
    border: 'none',
    filter: 'drop-shadow(2px 2px 1px #443356)',
    cursor: 'pointer',
    transition: 'opacity ease-in-out 1s',
    '@media (max-width: 720px)': {
      fontSize: '28px',
      width: '140px',
      height: '60px',
      marginTop: '15px',
    },
    '@media (max-width: 300px)': {
      fontSize: '20px',
      width: '110px',
      height: '40px',
      marginTop: '15px',
    },
  },
});

const useAppointmentCardStyles = createUseStyles({
  appointmentCard: {
    margin: '20px',
    padding: '10px',
    background:
      'radial-gradient(ellipse at top, rgba(64, 69, 178, .92), transparent), radial-gradient(ellipse at bottom, rgba(56, 17, 17, 1), transparent)',
    textShadow: '#e5d7d7 1px 0px 5px',
    textAlign: 'start',
    color: 'white',
    borderRadius: '10px',
    filter: 'drop-shadow(2px 2px 1px #443356)',
    WebkitUserSelect: 'none' /* Safari */,
    MozUserSelect: 'none' /* Firefox */,
    msUserSelect: 'none' /* IE10+/Edge */,
    userSelect: 'none',
    '@media (max-width: 920px)': {
      //fontSize: '36px'
    },
  },
  h4: {
    margin: 0,
  },
});

const SessionConfirmation = ({
  session,
  connection,
  schedule,
  user,
  updateView,
}) => {
  const classes = useStyles();

  useEffect(() => {
    const setupPaymentForm = async () => {
      const payments = Square.payments(
        process.env.SQUARE_APP_ID,
        process.env.SQUARE_LOCATION_ID
      );
      const card = await payments.card();
      document.getElementById('card-container').innerHTML = null;
      await card.attach('#card-container');

      const submitButton = document.getElementById('schedule-appointment');
      submitButton.addEventListener('click', async () => {
        try {
          submitButton.disabled = true;
          const tokenResult = await card.tokenize();
          let token;
          if (tokenResult.status === 'OK') {
            token = tokenResult.token;
          } else {
            submitButton.disabled = false;
            throw new Error(
              'Could not validate card details. Please try again!'
            );
          }

          await axios({
            method: 'POST',
            url: `http://127.0.0.1:3000/api/v1/appointments/create-appointment`,
            withCredentials: true,
            data: {
              user: user._id,
              squareId: user.squareId,
              session: session._id,
              connection: connection,
              price: session.price,
              date: schedule.date.toISO(),
              time: schedule.time.toISO(),
              paymentToken: token,
            },
          })
            .then(() => {
              updateView(5);
            })
            .catch((err) => {
              throw new Error(err.response.data.message);
            });
        } catch (err) {
          showAlert('error', `Error: ${err.message}`);
        }
      });
    };
    setupPaymentForm();
  }, []);

  return (
    <div className={classes.viewContainer}>
      <h1 className={classes.viewPrompt}>
        Please review your session details:
      </h1>
      <AppointmentCard
        session={session}
        connection={connection}
        date={schedule.date}
        time={schedule.time}
        useStyles={useAppointmentCardStyles}
      />
      <>
        <h3>Add your payment details to finalize your appointment.</h3>
        <div id="card-container" className={classes.cardContainer}>
          Loading...
        </div>
        <button
          className={classes.buttonEnabled}
          id="schedule-appointment"
          // enabled={paymentMethod ? 'true' : 'false'}
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Schedule Appointment
        </button>
      </>
    </div>
  );
};

export default SessionConfirmation;
