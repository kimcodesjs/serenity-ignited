import React from 'react';
import createUseStyles from 'react-jss';
import { useLocation } from 'react-router-dom';

const PurchaseConfirmation = ({ event }) => {
  const { state } = useLocation();

  return (
    <>
      <h1>Thank you for your purchase!</h1>
      <h2>{state.event.name}</h2>
    </>
  );
};

export default PurchaseConfirmation;
