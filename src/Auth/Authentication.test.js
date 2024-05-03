import React from 'react';
import Authentication from './Authentication';
import { AuthProvider } from '../Context/AuthContext';
import { render, screen } from '../Test Utilities/test-utils';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { server } from '../Test Utilities/server';
import { http, HttpResponse } from 'msw';

test('displays log in form and sign up form, switches between them', async () => {
  render(
    <AuthProvider>
      <Authentication />
    </AuthProvider>
  );

  const user = userEvent.setup();
  expect(await screen.findByPlaceholderText(/email/i)).toBeInTheDocument();
  expect(await screen.findByPlaceholderText(/password/i)).toBeInTheDocument();

  await user.click(screen.getByText(/i don\'t have an account yet/i));

  expect(await screen.findByPlaceholderText(/first name/i)).toBeInTheDocument();
  expect(await screen.findByPlaceholderText(/last name/i)).toBeInTheDocument();
  expect(
    await screen.findByPlaceholderText(/phone number/i)
  ).toBeInTheDocument();
  expect(
    await screen.findByPlaceholderText(/confirm password/i)
  ).toBeInTheDocument();

  await user.click(screen.getByText(/i already have an account!/i));

  expect(screen.queryByPlaceholderText(/first name/i)).not.toBeInTheDocument();
  expect(screen.queryByPlaceholderText(/last name/i)).not.toBeInTheDocument();
  expect(
    screen.queryByPlaceholderText(/phone number/i)
  ).not.toBeInTheDocument();
  expect(
    screen.queryByPlaceholderText(/confirm password/i)
  ).not.toBeInTheDocument();
});

test('successfully logs in existing user with credentials, shows greeting', async () => {
  render(
    <AuthProvider>
      <Authentication />
    </AuthProvider>
  );

  const user = userEvent.setup();

  await user.click(await screen.findByPlaceholderText(/email/i));
  expect(await screen.findByPlaceholderText(/email/i)).toHaveFocus();
  await user.keyboard('test{Shift>2}kimcodesjs.com');
  await user.click(await screen.findByPlaceholderText(/password/i));
  expect(await screen.findByPlaceholderText(/password/i)).toHaveFocus();
  await user.keyboard('testing1234');
  await user.click(screen.getByText(/submit/i));
  expect(await screen.findByText(/welcome, test/i)).toBeInTheDocument();
});

test('shows error message when incorrect or non-existing credentials are entered', async () => {
  render(
    <AuthProvider>
      <Authentication />
    </AuthProvider>
  );

  // is there a way to send json response that is an error?
  server.use(
    http.post(`*/api/v1/users/login`, async () => {
      return new HttpResponse(null, {
        status: 401,
        data: {
          message: 'Email or password was incorrect...',
        },
      });
    })
  );

  const user = userEvent.setup();
  await user.click(await screen.findByPlaceholderText(/email/i));
  expect(await screen.findByPlaceholderText(/email/i)).toHaveFocus();
  await user.keyboard('test{Shift>2}kimcodesjs.com');
  await user.click(await screen.findByPlaceholderText(/password/i));
  expect(await screen.findByPlaceholderText(/password/i)).toHaveFocus();
  await user.keyboard('test1234');
  await user.click(screen.getByText(/submit/i));
  expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
});

test('successfully signs up new user, shows greeting', async () => {
  render(
    <AuthProvider>
      <Authentication />
    </AuthProvider>
  );

  const user = userEvent.setup();
  await user.click(await screen.findByText(/i don\'t have an account yet/i));
  await user.click(await screen.findByPlaceholderText(/first name/i));
  expect(screen.getByPlaceholderText(/first name/i)).toHaveFocus();
  await user.keyboard('Testing');
  await user.keyboard('{Tab}');
  expect(screen.getByPlaceholderText(/last name/i)).toHaveFocus();
  await user.keyboard('Testerson');
  await user.keyboard('{Tab}');
  expect(screen.getByPlaceholderText(/phone number/i)).toHaveFocus();
  await user.keyboard('1234567898');
  await user.keyboard('{Tab}');
  expect(screen.getByPlaceholderText(/email/i)).toHaveFocus();
  await user.keyboard('test2{Shift>2/}kimcodesjs.com');
  await user.keyboard('{Tab}');
  expect(screen.getByTestId('password')).toHaveFocus();
  await user.keyboard('testing1234');
  await user.keyboard('{Tab}');
  expect(screen.getByPlaceholderText(/confirm password/i)).toHaveFocus();
  await user.keyboard('testing1234');
  await user.keyboard('{Tab}');
  await user.keyboard('{Enter}');
  expect(await screen.findByText(/welcome, testing/i));
  // need to update this handler to accept data from request object and return the data submitted in testing, so that the test can verify the application is reading data from the response object and displaying correctly. Currently, this test fails because my test handler is sending back static data, ignoring all request data.
});

test('displays error message when requesting a password reset before providing an email address', async () => {
  render(
    <AuthProvider>
      <Authentication />
    </AuthProvider>
  );

  const user = userEvent.setup();
  await user.click(await screen.findByText(/i forgot my password/i));
  expect(await screen.findByText(/please provide your email address/i));
});

test('displays success message when password reset has been sent', async () => {
  render(
    <AuthProvider>
      <Authentication />
    </AuthProvider>
  );

  const user = userEvent.setup();
  await user.click(screen.getByPlaceholderText(/email/i));
  expect(screen.getByPlaceholderText(/email/i)).toHaveFocus();
  await user.keyboard('test{Shift>2/}kimcodesjs.com');
  await user.click(screen.getByText(/i forgot my password/i));
  expect(
    await screen.findByText(
      /success! check your email for a link to reset your password/i
    )
  ).toBeInTheDocument();
});
