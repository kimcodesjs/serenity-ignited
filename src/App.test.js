import React from 'react';
import App from './App';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

test('renders Landing component on initial render', async () => {
  render(<App />);

  expect(await screen.findByTestId('landing-greeting')).toBeInTheDocument();
});

test('renders Menu Icon and Navigation, successfully navigates', async () => {
  render(<App />);

  expect(
    await screen.findByText(/learn about energy healing/i)
  ).toBeInTheDocument();
  expect(await screen.findByTestId('menu-icon')).toBeInTheDocument();
  await userEvent.click(screen.getByTestId('nav-link-booking'));
  expect(
    await screen.findByText(/let\'s create your healing session/i)
  ).toBeInTheDocument();
});
