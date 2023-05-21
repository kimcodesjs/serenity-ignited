import React from 'react';
import AuthForm from './AuthForm';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    height: '100vh',
    width: '100vw',
    backgroundImage:
      'linear-gradient(to bottom, rgba(56, 17, 17, .72), rgba(60, 23, 89, .0))',
    display: 'flex',
    flexDirection: 'column',
    //justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    zIndex: '-2',
    maskImage: 'linear-gradient(black 10%, transparent)',
  },
  foreground: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    zIndex: '-1',
    opacity: '.6',
    maskImage: 'linear-gradient(black 10%, transparent)',
  },
  logo: {
    filter: 'drop-shadow(5px 5px 1px #443356)',
    width: '200px',
    height: 'auto',
    marginTop: '50px',
    '@media (max-width: 450px)': {
      width: '200px',
      height: 'auto',
    },
  },
  h1: {
    marginBottom: '0px',
    fontFamily: "'Clicker Script', cursive",
    fontSize: '65px',
    color: 'white',
    textShadow: '#e5d7d7 1px 0px 5px',
    filter: 'drop-shadow(2px 2px 1px #443356)',
    '@media (max-width: 450px)': {
      fontSize: '55px',
    },
  },
});
const Authentication = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <img src="/4.png" className={classes.background} id="stars-back" />
      <img src="/2.png" className={classes.foreground} id="stars-front" />
      <img src="/logo-no-text.png" className={classes.logo} id="logo" />
      <h1 className={classes.h1}>Welcome!</h1>
      <br />
      <AuthForm />
    </div>
  );
};

export default Authentication;
