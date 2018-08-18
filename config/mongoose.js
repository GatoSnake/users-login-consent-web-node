const mongoose = require('mongoose');
const config = require('./');
const logger = rootRequire('./config/logger');

module.exports = () => {

  // connect to mongodb
  mongoose.connect(config.db, {
    useNewUrlParser: true
  });
  mongoose.Promise = global.Promise;
  var db = mongoose.connection;

  // CONNECTION EVENTS
  // When successfully connected
  db.on('connected', function() {
    logger.info(`Mongoose default connection open to ${config.db} (${(process.env.NODE_ENV ? process.env.NODE_ENV : 'development')})`);
  });

  // If the connection throws an error
  db.on('error', function(err) {
    logger.error(`Mongoose default connection error: ${err}`);
  });

  // When the connection is disconnected
  db.on('disconnected', function() {
    logger.warn(`Mongoose default connection disconnected`);
  });

  // When the connection is open
  db.once('open', function() {
    logger.info(`Mongoose default connection is open`);
  });

  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', function() {
    mongoose.connection.close(function() {
      logger.warn('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });

};
