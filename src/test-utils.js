import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import { EventProvider } from './Context/EventContext';
import { AdminProvider } from './Context/AdminContext';
import { BookingProvider } from './Context/BookingContext';

const AllProviders = ({ children }) => {
  return (
    <MemoryRouter>
      <AuthProvider>
        {/* <AdminProvider> */}
        <EventProvider>
          <BookingProvider>{children}</BookingProvider>
        </EventProvider>
        {/* </AdminProvider> */}
      </AuthProvider>
    </MemoryRouter>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
