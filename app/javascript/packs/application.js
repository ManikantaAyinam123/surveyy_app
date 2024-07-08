// app/javascript/packs/application.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { Provider } from 'react-redux';
import Store from '../redux/store'; // assuming 'store' is your Redux store

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  if (root) {
    ReactDOM.render(
      <Provider store={Store}>
        <App />
      </Provider>,
      root
    );
  }
});
