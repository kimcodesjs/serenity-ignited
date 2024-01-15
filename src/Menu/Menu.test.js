import React from 'react';
import Menu from './Menu';
import { AuthProvider } from '../Context/AuthContext';
import { render, screen } from '../Test Utilities/test-utils';
import { server } from '../Test Utilities/server';
import { http, HttpResponse } from 'msw';
import '@testing-library/jest-dom';

server.use(
  http.get(`*/api/v1/users/get-auth-status`, async () => {
    return HttpResponse.json({
      status: 204,
    });
  })
);

test('displays all nav links', async () => {
  render(
    <AuthProvider>
      <Menu />
    </AuthProvider>
  );

  expect(
    await screen.findByText(/learn about energy healing/i)
  ).toBeInTheDocument();
  expect(await screen.findByText(/book a session/i)).toBeInTheDocument();
  expect(await screen.findByText(/events/i)).toBeInTheDocument();
  expect(await screen.findByText(/contact me/i)).toBeInTheDocument();
  expect(await screen.findByText(/about me/i)).toBeInTheDocument();
  expect(await screen.findByText(/log in/i)).toBeInTheDocument();
  expect(await screen.findByText(/sign up/i)).toBeInTheDocument();
});

test('navigation menu updates when user is logged in', async () => {
  render(
    <AuthProvider>
      <Menu />
    </AuthProvider>
  );

  expect(await screen.findByText(/log out/i)).toBeInTheDocument();
  expect(await screen.findByText(/my sessions/i)).toBeInTheDocument();
});
