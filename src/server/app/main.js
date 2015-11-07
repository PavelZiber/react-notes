'use strict';

import React from 'react';
import express from 'express';
import compression from 'compression';
import config from './config';
import Layout from './layout';
import api from '../routes/api';
import expressValidator from 'express-validator';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressValidator(config.validatorOptions));
app.use(compression());
app.use('/build', express.static('build'));
app.use('/api', api);
app.use(errorHandler);

function errorHandler(err, req, res, next) {
  if (err) {
    var resp = {'status': 'ERROR', 'message':err};
    res.status(200).send(resp);
  }
}

app.get('*', (req, res) => {
  res.send('<!DOCTYPE html>' + React.renderToStaticMarkup(
    <Layout
      isProduction={config.isProduction}
      version={config.version}
    />
  ));
});

app.listen(config.port);
console.log(`Server started on port ${config.port}`);
