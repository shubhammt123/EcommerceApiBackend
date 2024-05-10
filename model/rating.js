const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  score: {
    type: Number,
    required: true,
    min: 1,    
    max: 5
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
