const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger');
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');
const collectionRoutes = require('./routes/collection');
const colorRoutes = require('./routes/colors');
const sizeRoutes = require('./routes/size');
const ratingRoutes = require('./routes/rating');
const reviewRoutes = require('./routes/review');
const userRoutes = require('./routes/user');
const cartRoutes = require('./routes/cart');

const app = express();
app.use(express.json());
require('dotenv').config();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/product',productRoutes);
app.use('/collection',collectionRoutes);
app.use('/category',categoryRoutes);
app.use('/color',colorRoutes);
app.use('/sizes',sizeRoutes);
app.use('/rating',ratingRoutes);
app.use('/review',reviewRoutes);
app.use('/user',userRoutes);
app.use('/carts',cartRoutes);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
