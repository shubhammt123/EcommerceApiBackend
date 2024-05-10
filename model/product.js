/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      required:
 *        - name
 *        - description
 *        - price
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated ID of the product.
 *        name:
 *          type: string
 *          description: The name of the product.
 *        description:
 *          type: string
 *          description: The detailed description of the product.
 *        price:
 *          type: number
 *          description: The price of the product.
 *        category:
 *          type: string
 *          description: The ID of the category to which the product belongs.
 *          $ref: '#/components/schemas/Category'
 *        sizes:
 *          type: array
 *          description: List of size IDs available for the product.
 *          items:
 *            type: string
 *            $ref: '#/components/schemas/Size'
 *        colors:
 *          type: array
 *          description: List of color IDs available for the product.
 *          items:
 *            type: string
 *            $ref: '#/components/schemas/Color'
 *        collectionType:
 *          type: string
 *          description: The ID of the collection type associated with the product.
 *          $ref: '#/components/schemas/Collection'
 */

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  sizes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Size' }],
  colors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Color' }],
  collectionType: { type: mongoose.Schema.Types.ObjectId, ref: 'CollectionType' },
  averageRating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
