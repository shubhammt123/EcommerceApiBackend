const express = require('express');
const router = express.Router();
const ratingController = require('../controller/rating');


router.post('/ratings', ratingController.createRating);
router.get('/ratings/product/:productId', ratingController.getRatingsByProduct);
router.put('/ratings/:ratingId', ratingController.updateRating);
router.delete('/ratings/:ratingId', ratingController.deleteRating); 

module.exports = router;
