import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { showAlert } from '../../alert';
import axios from 'axios';
import Authentication from '../../Auth/AuthForm';
import AppointmentCard from './AppointmentCard';
import { Link } from 'react-router-dom';

const useStyles = createUseStyles({
  viewContainer: {
    height: '88vh',
    width: '70%',
    maxWidth: '800px',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    overflowX: 'hidden',
  },
  viewPrompt: {
    marginBottom: '0',
    '@media (max-width: 920px)': {
      fontSize: '24px',
      marginLeft: '70px',
      marginRight: '70px',
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
  paymentSelect: {
    background:
      'radial-gradient(ellipse at top, rgba(232, 232, 185, .92) 1%, rgba(207, 194, 213, .4)), radial-gradient(ellipse at bottom, rgba(232, 232, 185, .92), transparent)',
    borderRadius: '10px',
    filter: 'drop-shadow(2px 2px 1px #443356)',
    width: '50%',
    height: '175px',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '15px',
  },
  buttonEnabled: {
    // height: '60px',
    // width: '170px',
    // marginTop: '30px',
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

const SessionConfirmation = ({ user, session, connection, schedule }) => {
  const classes = useStyles();

  const [authFlow, setAuthFlow] = useState('sign-up');
  const [sessionConfirmed, setConfirmation] = useState(false);
  const [paymentToken, setToken] = useState(null);

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
              setConfirmation(true);
            })
            .catch((err) => {
              throw new Error(err.response.data.message);
            });
        } catch (err) {
          console.log(err);
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
      {user === null && (
        <>
          <h3 className={classes.h3}>
            Sign in to continue finalizing your appointment:
          </h3>
          {authFlow === 'sign-up' && (
            <p
              className={classes.p}
              onClick={(e) => {
                e.preventDefault();
                setAuthFlow('log-in');
              }}
            >
              I already have an account!
            </p>
          )}
          {authFlow === 'log-in' && (
            <p
              className={classes.p}
              onClick={(e) => {
                e.preventDefault();
                setAuthFlow('sign-up');
              }}
            >
              I don't have an account yet.
            </p>
          )}
          <Authentication authFlow={authFlow} />
        </>
      )}
      {user != null && sessionConfirmed === false && (
        <div>
          <h2>
            Thank you for allowing me to join you on your healing journey,{' '}
            {user.firstName}!
          </h2>
          <h4>Please add your payment details to finalize your appointment.</h4>
          <div className={classes.paymentSelect}>
            <div id="card-container">Loading...</div>
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
          </div>
        </div>
      )}
      {sessionConfirmed === true && (
        <div>
          <h3>
            Your appointment has been booked! Here are some tips to keep in mind
            while preparing for your session.
          </h3>
          <h4>
            Please visit the{' '}
            <Link to={`/${user.uid}/my-sessions`}>My Sessions</Link> page to
            view your upcoming appointments and edit or reschedule if need be.
          </h4>
        </div>
      )}
    </div>
  );
};

export default SessionConfirmation;
