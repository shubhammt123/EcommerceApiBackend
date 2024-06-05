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
app.use('/api-docs', express.static(path.join(__dirname, 'node_modules', 'swagger-ui-dist')));
app.get('/',(req,res)=>{
  res.send("Ecommerce Backend")
})
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

const MONGO_URI = "mongodb+srv://shubhammt123:hp5FLPe1BXPBMs3D@mymongodb.jy0ll84.mongodb.net/?retryWrites=true&w=majority&appName=myMongoDb";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
