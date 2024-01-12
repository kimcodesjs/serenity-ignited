import React from 'react';
import Landing from './Landing';
import { EventProvider } from '../Context/EventContext';
import { render, screen } from '../Test Utilities/test-utils';
import '@testing-library/jest-dom';

test('displays greeting text', async () => {
  render(
    // <EventProvider>
    <Landing />
    // </EventProvider>
  );

  expect(screen.getByTestId('landing-greeting')).toBeInTheDocument();
  expect(
    await screen.findByText(/thursday night meditation/i)
  ).toBeInTheDocument();
  expect(await screen.findByText(/spots available: 7/i)).toBeInTheDocument();
});
