import React from 'react';
import Booking from './Booking';
import { BookingProvider } from '../Context/BookingContext';
import { AuthProvider } from '../Context/AuthContext';
import { render, screen } from '../Test Utilities/test-utils';
import { server } from '../Test Utilities/server';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import '@testing-library/jest-dom';

test('displays booking greeting', async () => {
  render(
    <AuthProvider>
      <BookingProvider>
        <Booking />
      </BookingProvider>
    </AuthProvider>
  );

  expect(
    await screen.findByText(/let\'s create your healing session!/i)
  ).toBeInTheDocument();
  expect(await screen.findByText(/get started/i)).toBeInTheDocument();
});

test('transitions to each view after selection is made', async () => {
  render(
    <AuthProvider>
      <BookingProvider>
        <Booking />
      </BookingProvider>
    </AuthProvider>
  );

  const user = userEvent.setup();

  // transition from view to session view
  await user.click(screen.getByText(/get started/i));
  expect(await screen.findByText('Session')).toBeInTheDocument();
  expect(
    await screen.findByText(/choose your healing session:/i)
  ).toBeInTheDocument();

  // arrow should be disabled before a selection is made
  await user.click(screen.getByText('arrow_circle_right'));
  expect(await screen.findByText(/choose your healing session:/i));

  // selection is made, arrow enabled
  await user.click(screen.getByText('Sample Session'));
  await user.click(screen.getByText('arrow_circle_right'));
  expect(await screen.findByText(/connection/i));

  // arrow should be disabled
  await user.click(screen.getByText('arrow_circle_right'));
  expect(await screen.findByText(/select how you would prefer to connect:/i));

  // selection is made, arrow enabled
  await user.click(screen.getByText('In Person'));
  await user.click(screen.getByText('arrow_circle_right'));
  expect(await screen.findByText(/schedule/i));

  // arrow should be disabled
  await user.click(screen.getByText('arrow_circle_right'));
  expect(
    await screen.findByText(/when would you like to receive your healing\?/i)
  );

  // selection is made, arrow enabled
  await user.click(screen.getByText(/please select a timeslot./i));
});
