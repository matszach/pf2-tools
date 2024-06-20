import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { startAlertFilter } from './utils/alert-filter.util';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

startAlertFilter();