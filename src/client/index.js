import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Main } from './components/Main';
import store from './store';

/* eslint-disable */
ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
/* eslint-enable */
