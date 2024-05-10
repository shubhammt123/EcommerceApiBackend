/**
 * @swagger
 * components:
 *  schemas:
 *    Category:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated ID of the category.
 *        name:
 *          type: string
 *          description: The name of the category.
 *      example:
 *        id: 507f1f77bcf86cd799439011
 *        name: Electronics
 */

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
