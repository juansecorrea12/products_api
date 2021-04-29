'use strict'

const express = require('express');
const body_parser = require('body-parser');
const app = express();
const api = require('./routes');

app.use(body_parser.urlencoded({extended: false}));
app.use(body_parser.json());
app.use('/api', api);


module.exports = app;