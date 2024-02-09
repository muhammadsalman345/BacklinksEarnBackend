const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: { type: String },
  isVerified: { type: Boolean, default: false },
  profile_picture: { type: String }, // Change type to String for storing the URL
});

const User = mongoose.model('User', userSchema);

module.exports = User;
