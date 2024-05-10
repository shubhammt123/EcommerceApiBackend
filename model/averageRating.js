const mongoose = require('mongoose');

const averageRatingSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        unique: true 
    },
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
});

const AverageRating = mongoose.model('AverageRating', averageRatingSchema);

module.exports = AverageRating;
