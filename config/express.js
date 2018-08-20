const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const config = require('./');

module.exports = (app) => {

  // view engine setup
  app.set('views', path.join(__dirname, '../app/views'));
  app.set('view engine', 'pug');

  // session setup
  app.use(session({
    secret: config.session.secret,
    resave: false,
    saveUninitialized: false
  }));

  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

  //uncomment if you want to see access logs
  app.use(logger('dev'));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '../public')));

};
