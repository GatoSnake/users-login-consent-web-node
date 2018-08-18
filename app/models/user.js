const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: String,
  name: String,
  lastname: String,
  age: String,
  address: String,
  city: String,
  country: String,
  date: {
    type: Date,
    default: Date.now
  }
});

/* Methods user */

userSchema.methods = {};

userSchema.statics = {}

const User = mongoose.model('User', userSchema);

module.exports = User;
