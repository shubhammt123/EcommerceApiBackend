const Rating = require('../model/rating');
const AverageRating = require('../model/averageRating');
const Product = require('../model/product');


async function updateAverageRating(productId, score, oldScore = null) {
  let averageRating = await AverageRating.findOne({ product: productId });
  console.log(averageRating);

  if (averageRating) {
    if (oldScore !== null) {
      const totalScore = averageRating.average * averageRating.count - oldScore + score;
      averageRating.average = totalScore / averageRating.count;
    } else {
      
      console.log("Adding new score");
      const totalScore = averageRating.average * averageRating.count + score;
      averageRating.count += 1;
      averageRating.average = totalScore / averageRating.count;
    }
  } else {
    
    averageRating = new AverageRating({
      product: productId,
      average: score,
      count: 1
    });
    await averageRating.save();
  }

  if (averageRating) {
    await averageRating.save();
  }
  const product = await Product.findById(productId);
  if (product) {
    product.averageRating = {
      average: averageRating ? averageRating.average : newScore,
      count: averageRating ? averageRating.count : 1
    };
    await product.save();
  }
}



async function adjustAverageRatingOnDelete(rating) {
  const averageRating = await AverageRating.findOne({ product: rating.product });
  if (averageRating.count > 1) {
      const totalScore = averageRating.average * averageRating.count - rating.score;
      averageRating.count -= 1;
      averageRating.average = totalScore / averageRating.count;
      await averageRating.save();
  } else {
      await AverageRating.findByIdAndDelete(averageRating._id);
  }
}

exports.createRating = async (req, res) => {
  const { score, productId, userId } = req.body;
  try {
    const rating = new Rating({
      score,
      product: productId,
      user: userId
    });
    await rating.save();
    await updateAverageRating(productId, score); 

    res.status(201).json(rating);
  } catch (error) {
    res.status(500).json({ message: 'Error creating rating', error: error.message });
  }
};


exports.getRatingsByProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const ratings = await Rating.find({ product: productId });
    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ratings', error: error.message });
  }
};


exports.updateRating = async (req, res) => {
  const { ratingId } = req.params;
  const { score } = req.body;
  try {
    const rating = await Rating.findById(ratingId);
    const oldScore = rating.score;
    rating.score = score;
    await rating.save();

    await updateAverageRating(rating.product, score, oldScore); 

    res.status(200).json(rating);
  } catch (error) {
    res.status(500).json({ message: 'Error updating rating', error: error.message });
  }
};

exports.deleteRating = async (req, res) => {
    const { ratingId } = req.params;
    try {
      const rating = await Rating.findById(ratingId);
      if (!rating) {
        return res.status(404).json({ message: 'Rating not found' });
      }
      await adjustAverageRatingOnDelete(rating);
      await Rating.deleteOne({ _id: ratingId });
      
      res.status(204).json({ message: 'Rating deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting rating', error: error.message });
    }
};