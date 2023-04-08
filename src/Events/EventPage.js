import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DateTime } from 'luxon';
import axios from 'axios';
import { createUseStyles } from 'react-jss';
import { showAlert } from '../alert';

const useStyles = createUseStyles({
  pageTitle: {
    width: '100%',
    marginTop: '0px',
    marginBottom: '0px',
    fontFamily: "'Euphoria Script', cursive",
    textAlign: 'center',
    fontSize: '50px',
    '@media (max-width: 450px)': {
      fontSize: '30px',
      textAlign: 'center',
    },
  },
  pageSubtitle: {
    margin: '0 auto',
    maxWidth: '700px',
    fontSize: '20px',
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
  button: {
    //width: '150px',
    height: '60px',
    marginTop: '15px',
    fontFamily: "'Clicker Script', cursive",
    fontSize: '30px',
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
      //width: '140px',
      height: '60px',
      marginTop: '15px',
    },
    '@media (max-width: 450px)': {
      fontSize: '20px',
      //width: '110px',
      height: '40px',
      marginLeft: 'auto',
      marginRight: 'auto',
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
});

const EventPage = ({ user }) => {
  const [event, setEvent] = useState({});

  let { eventId } = useParams();
  const classes = useStyles();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        await axios({
          method: 'GET',
          url: `http://127.0.0.1:3000/api/v1/events/${eventId}`,
        }).then((res) => {
          setEvent(res.data.data);
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchEvent();
  }, []);

  useEffect(() => {
    const setupPaymentForm = async () => {
      const payments = Square.payments(
        process.env.SQUARE_APP_ID,
        process.env.SQUARE_LOCATION_ID
      );
      const card = await payments.card();
      document.getElementById('card-container').innerHTML = null;
      await card.attach('#card-container');
      document
        .getElementById('purchase-ticket')
        .addEventListener('click', async () => {
          try {
            const tokenResult = await card.tokenize();
            let token;
            if (tokenResult.status === 'OK') {
              token = tokenResult.token;
            } else {
              throw new Error(
                'Could not validate card details. Please try again!'
              );
            }

            await axios({
              method: 'POST',
              url: `http://127.0.0.1:3000/api/v1/events/purchase-ticket`,
              withCredentials: true,
              data: {
                user: user._id,
                squareId: user.squareId,
                event: event._id,
                price: event.price,
                paymentToken: token,
              },
            })
              .then(() => {
                showAlert('success', 'Payment successful!');
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
  }, [event]);

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <>
      <div className={classes.eventDetails}>
        <h1 className={classes.pageTitle}>Reserve Your Spot!</h1>
        <br />
        <p className={classes.pageSubtitle}>
          Coming together with the intention of cultivating inner peace and
          deepening our connection to Self, weekly guided meditations provide a
          communal and welcoming atmosphere for individuals seeking a sense of
          harmony within and without.
        </p>
        <br />
        <h1 className={classes.eventTitle}>{event.name}</h1>
        <h2>{event.description}</h2>
        <h3>
          {DateTime.fromISO(event.start).toLocaleString(DateTime.DATETIME_FULL)}
        </h3>
        <h3>{currencyFormatter.format(event.price)}</h3>
        <div id="card-container">Loading...</div>
        <button className={classes.button} id="purchase-ticket">
          Purchase Ticket
        </button>
      </div>

      <img src="../Chakra Mandala.png" className={classes.imgLeft} />
      <img src="../Chakra Mandala.png" className={classes.imgRight} />
    </>
  );
};

export default EventPage;
