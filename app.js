const express = require('express');

const app = express();

// Global functions
global.rootRequire = function(name) {
    return require(__dirname + '/' + name);
}

// Bootstrap routes
require('./config/logger');
require('./config/express')(app);
require('./config/mongoose')();
require('./config/routes')(app);

module.exports = app;
