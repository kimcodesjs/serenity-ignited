import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  contactContainer: {
    background:
      'radial-gradient(ellipse at top, rgba(232, 232, 185, .92), transparent), radial-gradient(ellipse at bottom, rgba(232, 232, 185, .92), transparent), url("/4.png")',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    width: '100%',
    minHeight: '100%',
  },
  contactContent: {
    //width: '80%',
    maxWidth: '960px',
    marginLeft: 'auto',
    marginRight: 'auto',
    '@media (max-width: 400px)': {
      maxWidth: '90%',
    },
  },
  logo: {
    display: 'block',
    width: '40%',
    maxWidth: '730px',
    height: 'auto',
    paddingRight: '50px',
    margin: 'auto',
    filter: 'drop-shadow(0px 0px 5px #443356)',
    zIndex: 0,
    '@media (max-height: 900px)': {
      width: '50%',
      height: 'auto',
    },
    '@media (max-width: 450px)': {
      width: '90%',
      height: 'auto',
      paddingRight: 0,
    },
  },
  header: {
    fontFamily: "'Over the Rainbow', cursive",
    marginTop: '0',
    //paddingTop: '50px',
    textShadow: '#381111 1px 0px 20px',
    textAlign: 'center',
    '@media (max-width: 400px)': {
      fontSize: '24px',
    },
  },
  contactForm: {
    width: '500px',
    maxWidth: '75%',
    margin: 'auto',
    '@media (max-width: 400px)': {
      maxWidth: '90%',
    },
  },
  label: {
    marginLeft: '10px',
    marginRight: '10px',
  },
  input: {
    borderRadius: '10px',
    padding: '5px',
    margin: '10px',
    borderWidth: '1px',
    fontFamily: 'inherit',
    width: '-webkit-fill-available',
    width: '-moz-available',
    width: 'fill-available',
    maxWidth: '250px',
  },
  textArea: {
    width: '-webkit-fill-available',
    width: '-moz-available',
    width: 'fill-available',
    height: '100px',
    resize: 'none',
    borderRadius: '10px',
    padding: '5px',
    margin: '10px',
    fontFamily: 'inherit',
  },
  button: {
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
    margin: 'auto',
    '@media (max-width: 720px)': {
      fontSize: '28px',
    },
    '@media (max-width: 300px)': {
      fontSize: '20px',
    },
  },
  img: {
    display: 'block',
    width: '50%',
    maxWidth: '600px',
    height: 'auto',
    margin: 'auto',
  },
});

const ContactMe = () => {
  const classes = useStyles();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    // REPLACE WITH BACKEND INTEGRATION
    // await addDoc(collection(db, 'ContactSubmissions'), {
    //     name: name.value,
    //     email: email.value,
    //     message: message.value
    // }).then(() => {
    //     console.log('Success! New Contact Submission has been logged in Firestore!')
    //     setSuccess(true)
    //     name.value = ''
    //     email.value = ''
    //     message.value = ''
    // }).catch((error) => {
    //     console.log(error)
    //     setError('Something went wrong...')
    // })
  };
  return (
    <div className={classes.contactContainer}>
      <div className={classes.contactContent}>
        <img className={classes.logo} src="serenity-ignited-logo.png" />
        <h1 className={classes.header}>
          I am looking forward to hearing from you!
        </h1>
        <form className={classes.contactForm}>
          <label htmlFor="name" className={classes.label}>
            Your Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className={classes.input}
            required
          />
          <br />
          <label htmlFor="email" className={classes.label}>
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className={classes.input}
            required
          />
          <br />
          <label htmlFor="message" className={classes.label}>
            What can I help you with?
          </label>
          <textarea
            name="message"
            id="message"
            className={classes.textArea}
            required
          />
          <br />
          <button
            className={classes.button}
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Submit
          </button>
        </form>
        <br />
        {success && <h3>Your message has been sent!</h3>}
        {error && <h3>{error}</h3>}
        <img className={classes.img} src="Namaste.png" />
      </div>
    </div>
  );
};

export default ContactMe;
