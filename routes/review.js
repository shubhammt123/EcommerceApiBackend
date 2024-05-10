const express = require('express');
const router = express.Router();
const reviewController = require('../controller/review');

router.post('/reviews', reviewController.createReview);
router.get('/reviews/product/:productId', reviewController.getReviewsByProduct);
router.put('/reviews/:reviewId', reviewController.updateReview);
router.delete('/reviews/:reviewId', reviewController.deleteReview);

module.exports = router;


