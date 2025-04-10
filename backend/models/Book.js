const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  city: String,
  contact: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['Available', 'Rented/Exchanged'], default: 'Available' }
});

module.exports = mongoose.model('Book', bookSchema);
