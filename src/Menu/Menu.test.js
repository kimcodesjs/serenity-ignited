import React from 'react';
import Menu from './Menu';
import { AuthProvider } from '../Context/AuthContext';
import { render, screen } from '../Test Utilities/test-utils';
import { server } from '../Test Utilities/server';
import userEvent from '@testing-library/user-event';
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

  expect(await screen.findByText(/discover/i)).toBeInTheDocument();
  expect(await screen.findByText(/booking/i)).toBeInTheDocument();
  expect(await screen.findByText(/events/i)).toBeInTheDocument();
  expect(await screen.findByText(/contact/i)).toBeInTheDocument();
  expect(await screen.findByText(/about/i)).toBeInTheDocument();
  expect(await screen.findByText(/log in/i)).toBeInTheDocument();
  expect(await screen.findByText(/sign up/i)).toBeInTheDocument();
});

test('navigation menu updates when user is logged out', async () => {
  render(
    <AuthProvider>
      <Menu />
    </AuthProvider>
  );

  expect(await screen.findByText(/log out/i)).toBeInTheDocument();
  expect(await screen.findByText(/my sessions/i)).toBeInTheDocument();
});

test('displays success message when log out has been completed', async () => {
  render(
    <AuthProvider>
      <Menu />
    </AuthProvider>
  );

  const user = userEvent.setup();
  await user.click(await screen.findByText(/log out/i));
  expect(
    await screen.findByText(/logged out successfully!/i)
  ).toBeInTheDocument();
});
