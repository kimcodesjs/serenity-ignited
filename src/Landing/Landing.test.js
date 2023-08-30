import React from 'react';
import Landing from './Landing';
import { render, screen } from '../test-utils';
import '@testing-library/jest-dom';

test('displays greeting text', () => {
  render(<Landing />);

  expect(screen.getByTestId('landing-greeting')).toBeInTheDocument();
});
