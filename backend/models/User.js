const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: { type: String, unique: true },
  password: String, // Store plain text password for simplicity (in production use bcrypt)
  role: { type: String, enum: ['Owner', 'Seeker'], required: true }
});

module.exports = mongoose.model('User', userSchema);
