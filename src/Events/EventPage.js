import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { DateTime } from 'luxon';
import axios from 'axios';
import { createUseStyles } from 'react-jss';
import { showAlert } from '../Utilities/alert';
import { AuthContext } from '../Context/AuthContext';
import { EventContext } from '../Context/EventContext';

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
  eventDetails: {
    maxWidth: '75%',
    margin: 'auto',
    paddingTop: '20px',
    textAlign: 'center',
  },
  eventTitle: {
    marginTop: 0,
  },
  cardContainer: {
    maxWidth: '300px',
    margin: 'auto',
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

const EventPage = () => {
  const event = useLocation().state.event;
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const classes = useStyles();
  const user = useContext(AuthContext);
  const { submitPurchase } = useContext(EventContext);

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
            let paymentToken;
            if (tokenResult.status === 'OK') {
              paymentToken = tokenResult.token;
            } else {
              throw new Error(
                'Could not validate card details. Please try again!'
              );
            }

            await submitPurchase(event, quantity, paymentToken).then(() => {
              navigate(`/events/${event._id}/purchase-confirmation`, {
                state: { event },
              });
            });
          } catch (err) {
            showAlert(`Error: ${err.message}`, 'error');
          }
        });
    };
    if (user) {
      setupPaymentForm();
    }
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
        <h1 className={classes.eventTitle}>{event.name}</h1>
        <h2>{event.description}</h2>
        <h3>
          {DateTime.fromISO(event.start).toLocaleString(DateTime.DATETIME_FULL)}
        </h3>
        <label htmlFor="quantity">Quantity: </label>
        <select
          name="quantity"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
        <h3>Total: {currencyFormatter.format(event.price * quantity)}</h3>
        {!user && (
          <div>
            Please <Link>log in or sign up</Link> to RSVP
          </div>
        )}
        {user && (
          <>
            <div id="card-container" className={classes.cardContainer}></div>
            <button className={classes.button} id="purchase-ticket">
              Purchase
            </button>
          </>
        )}
      </div>

      <img src="../Chakra Mandala.png" className={classes.imgLeft} />
      <img src="../Chakra Mandala.png" className={classes.imgRight} />
    </>
  );
};

export default EventPage;
