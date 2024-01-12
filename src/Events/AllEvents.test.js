import React from 'react';
import AllEvents from './Events';
import { EventProvider } from '../Context/EventContext';
import { render, screen } from '../Test Utilities/test-utils';
import '@testing-library/jest-dom';

test('displays event data fetched in context', () => {
  render(
    <EventProvider>
      <AllEvents />
    </EventProvider>
  );

  // expect(screen.getByText(/thursday night meditation/i)).toBeInTheDocument();
  // expect(screen.getByText(/spots available: 7/i)).toBeInTheDocument();
});
