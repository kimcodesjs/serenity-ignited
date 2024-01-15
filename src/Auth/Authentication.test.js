import React from 'react';
import Authentication from './Authentication';
import { AuthProvider } from '../Context/AuthContext';
import { render, screen } from '../Test Utilities/test-utils';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

test('displays log in form and sign up form', async () => {
  render(
    <AuthProvider>
      <Authentication />
    </AuthProvider>
  );

  expect(await screen.findByPlaceholderText(/email/i)).toBeInTheDocument();
  expect(await screen.findByPlaceholderText(/password/i)).toBeInTheDocument();

  await userEvent.click(screen.getByText(/i don\'t have an account yet/i));

  expect(await screen.findByPlaceholderText(/first name/i)).toBeInTheDocument();
  expect(await screen.findByPlaceholderText(/last name/i)).toBeInTheDocument();
  expect(
    await screen.findByPlaceholderText(/phone number/i)
  ).toBeInTheDocument();
  expect(
    await screen.findByPlaceholderText(/confirm password/i)
  ).toBeInTheDocument();
});
