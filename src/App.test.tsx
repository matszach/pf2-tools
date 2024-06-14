import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders the App component', () => {
  render(<App />);
  const appElement = document.getElementsByClassName('App')[0];
  expect(appElement).toBeInTheDocument();
});
