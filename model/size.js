/**
 * @swagger
 * components:
 *  schemas:
 *    Size:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated ID of the size.
 *        name:
 *          type: string
 *          description: The name of the size.
 *      example:
 *        id: 507f1f77bcf86cd799439011
 *        name: Medium
 */

const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

const Size = mongoose.model('Size', sizeSchema);

module.exports = Size;
