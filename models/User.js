const mongoose = require('mongoose');

//userschema
const UserSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true
  },
  otp: String,
  verified: {
    type: Boolean,
    default: false
  }
});

//defining model
const User = mongoose.model('User', UserSchema);

module.exports = User;