import React from 'react';
import AuthForm from './AuthForm';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    height: '100vh',
    width: '100vw',
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
const Authentication = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <AuthForm />
      <img src="Chakra Mandala.png" className={classes.imgLeft} />
      <img src="Chakra Mandala.png" className={classes.imgRight} />
    </div>
  );
};

export default Authentication;
