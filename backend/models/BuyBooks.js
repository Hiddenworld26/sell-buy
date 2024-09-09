const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  coverUrls: [String],
  rating: Number,
  price: Number,
  description: String,
});

const buyBook = mongoose.model('buyBook', bookSchema);

module.exports = buyBook;
