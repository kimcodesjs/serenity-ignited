import React from 'react';
import Landing from './Landing';
import { EventProvider } from '../Context/EventContext';
import { render, screen } from '../Test Utilities/test-utils';
import { server } from '../Test Utilities/server';
import { http, HttpResponse } from 'msw';

import '@testing-library/jest-dom';

test('displays greeting text', async () => {
  render(
    <EventProvider>
      <Landing />
    </EventProvider>
  );

  expect(await screen.findByTestId('landing-greeting')).toBeInTheDocument();
});

test('renders event cards', async () => {
  render(
    <EventProvider>
      <Landing />
    </EventProvider>
  );
  expect(
    await screen.findByText(/thursday night meditation/i)
  ).toBeInTheDocument();
  expect(await screen.findByText(/spots available: 7/i)).toBeInTheDocument();
});

server.use(
  http.get(`*/api/v1/events/`, async () => {
    return HttpResponse.json({
      status: 200,
      data: [],
    });
  })
);

test('renders fallback text when there are no upcoming meditations', async () => {
  render(
    <EventProvider>
      <Landing />
    </EventProvider>
  );

  expect(
    await screen.findByText(
      /looks like we don\'t have any meditation events coming up/i
    )
  ).toBeInTheDocument();
});
