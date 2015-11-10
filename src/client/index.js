import * as React from 'react';
import Router from './router/router';
import {render} from 'react-dom';
require('babel/register');

const app = document.getElementById('app-root');

Router().run((Handler, state) => {
  render(<Handler />, app);
});


