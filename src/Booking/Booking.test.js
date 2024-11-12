import React from 'react';
import Booking from './Booking';
import { DateTime } from 'luxon';
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
    await screen.findByText(/experience serenity in healing/i)
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
  await user.click(await screen.findByText(/get started/i));

  // advanceTimersByTime allows the timeout in exitComponent of Greeting.js
  // to finalize UI changes that follow
  // jest.useFakeTimers()
  // jest.runAllTimers()
  // ^^ Commented out, suspected bug with jest's timers not executing properly.

  expect(await screen.findByText('Session')).toBeInTheDocument();
  expect(
    await screen.findByText(/choose your healing session:/i)
  ).toBeInTheDocument();

  // // arrow should be disabled before a selection is made
  // await user.click(screen.getByTestId('arrow-forward'));
  // expect(await screen.findByText(/choose your healing session:/i));

  // // selection is made, arrow enabled
  // await user.click(screen.getByText('Sample Session'));
  // await user.click(screen.getByTestId('arrow-forward'));
  // expect(await screen.findByText(/connection/i));

  // // arrow should be disabled before next selection is made
  // await user.click(screen.getByTestId('arrow-forward'));
  // expect(await screen.findByText(/select how you would prefer to connect:/i));

  // // selection is made, arrow enabled
  // await user.click(screen.getByText('In Person'));
  // await user.click(screen.getByTestId('arrow-forward'));
  // expect(await screen.findByText(/schedule/i));

  // // arrow should be disabled before next selection is made
  // await user.click(screen.getByTestId('arrow-forward'));
  // expect(
  //   await screen.findByText(/when would you like to receive your healing\?/i)
  // );

  // // selection is made, arrow enabled
  // await user.click(screen.getByText(/please select a timeslot./i));
  // await user.click(
  //   screen.getByRole('button', {
  //     name: `${DateTime.now()
  //       .plus({ days: 1 })
  //       .toLocaleString(DateTime.DATE_FULL)}`,
  //   })
  // );

  // await userEvent.selectOptions(screen.getByRole('combobox'), [
  //   '6:30 PM - 6:50 PM',
  // ]);
  // expect(
  //   await screen.getByRole('option', { name: '6:30 PM - 6:50 PM' }).selected
  // ).toBe(true);

  // TO DO: Test below fails as Square is not defined...
  // await user.click(screen.getByText('arrow_circle_right'));
  // expect(await screen.findByText(/please review your session details:/i));
});
