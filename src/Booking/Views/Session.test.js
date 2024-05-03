import React from 'react';
import Session from './Session';
import { BookingProvider } from '../../Context/BookingContext';
import { AuthProvider } from '../../Context/AuthContext';
import { render, screen } from '../../Test Utilities/test-utils';
import { server } from '../../Test Utilities/server';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import '@testing-library/jest-dom';

// test changing between modality selections
test('displays modality selection and option cards', async () => {
  render(
    <AuthProvider>
      <BookingProvider>
        <Session />
      </BookingProvider>
    </AuthProvider>
  );

  expect(
    await screen.findByText(/choose your healing session:/i)
  ).toBeInTheDocument();
  expect(await screen.findByLabelText('Reiki')).toBeInTheDocument();
  expect(await screen.findByLabelText('Access')).toBeInTheDocument();
  expect(await screen.findByLabelText('Packages')).toBeInTheDocument();
  expect(await screen.findByText('Sample Session')).toBeInTheDocument();
  expect(await screen.findByText(/general healing/i)).toBeInTheDocument();
  expect(await screen.findByText(/reiki \+ access bars/i)).toBeInTheDocument();
});
