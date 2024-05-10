const Review = require('../model/review');



exports.createReview = async (req, res) => {
  const { content, productId, userId } = req.body;
  try {
    const review = new Review({
      content,
      product: productId,
      user: userId
    });
    await review.save();


    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error creating review', error: error.message });
  }
};


exports.getReviewsByProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const reviews = await Review.find({ product: productId }).populate('user', 'firstName lastName');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
};


exports.updateReview = async (req, res) => {
  const { reviewId } = req.params;
  const { content } = req.body;
  try {
    const updatedReview = await Review.findByIdAndUpdate(reviewId, { content }, { new: true });
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: 'Error updating review', error: error.message });
  }
};


exports.deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  try {
    await Review.findByIdAndDelete(reviewId);
    res.status(204).json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review', error: error.message });
  }
};
