import React from 'react';
import Landing from './Landing';
import { EventProvider } from '../Context/EventContext';
import { render, screen } from '../test-utils';
import '@testing-library/jest-dom';

test('displays greeting text', () => {
  render(
    <EventProvider>
      <Landing />
    </EventProvider>
  );

  expect(screen.getByTestId('landing-greeting')).toBeInTheDocument();
});
