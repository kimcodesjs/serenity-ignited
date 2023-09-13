import React from 'react';
import createUseStyles from 'react-jss';
import { useLocation } from 'react-router-dom';

const PurchaseConfirmation = () => {
  const { state } = useLocation();

  return (
    <>
      <h1>Thank you for your purchase!</h1>
      <h2>
        Check your email for confirmation that you've successfully reserved your
        spot for {state.event.name}.
      </h2>
    </>
  );
};

export default PurchaseConfirmation;
