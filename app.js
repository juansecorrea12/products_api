'use strict'

const express = require('express');
const body_parser = require('body-parser');
const app = express();
const api = require('./routes');
const hbs = require('express-handlebars');

app.use(body_parser.urlencoded({extended: false}));
app.use(body_parser.json());
app.engine('.hbs', hbs({
    defaultLayout: 'default',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.use('/api', api);
app.get('/login', (req, res) => {
    res.render('login')
})


module.exports = app;