import React from 'react';
import { DateTime } from 'luxon';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const modalityFormatter = (array) => {
  if (array.length === 1) return array[0];
  return 'Healing Package';
};

const AppointmentCard = ({
  session,
  connection,
  date,
  time,
  useStyles,
  onCancel,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.appointmentCard}>
      <h3 className={classes.h4}>
        {modalityFormatter(session.modality)}: {session.name}
      </h3>
      <h4 className={classes.h4}>
        {connection} on {date.toLocaleString(DateTime.DATE_HUGE)}
      </h4>
      <h4 className={classes.h4}>
        {time.start.toLocaleString(DateTime.TIME_SIMPLE)} to{' '}
        {time.end.toLocaleString(DateTime.TIME_SIMPLE)}
      </h4>
      <h4 className={classes.h4}>{currencyFormatter.format(session.price)}</h4>
      {onCancel && (
        <button className={classes.button} onClick={onCancel}>
          Cancel
        </button>
      )}
    </div>
  );
};

export default AppointmentCard;
