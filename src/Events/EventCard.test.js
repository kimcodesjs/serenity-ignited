import React from 'react';
import EventCard from './EventCard';
import { render, screen } from '../test-utils';
import '@testing-library/jest-dom';

let event = {
  _id: '645db0ef030b2fba403f4ed2',
  category: 'meditation',
  name: 'Thursday Night Meditation',
  description: 'A quiet place to calm the mind.',
  start: '2023-05-11T18:00:00.436-05:00',
  end: '2023-05-11T19:30:00.436-05:00',
  price: 10,
  capacity: {
    max: 7,
    available: 7,
  },
};

test('displays event data as text', () => {
  render(<EventCard event={event} />);

  expect(screen.getByText(/thursday night meditation/i)).toBeInTheDocument();
});
