import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { createHistory, LocationProvider } from 'router';
import createHashSource from 'hash-source';
const source = createHashSource();
const history = createHistory(source);

import Router from './router';

render(
  <LocationProvider history={history}>
    <Router />
  </LocationProvider>,
  document.getElementById('app')
);
