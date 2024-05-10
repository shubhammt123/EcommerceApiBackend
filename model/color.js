/**
 * @swagger
 * components:
 *  schemas:
 *    Color:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated ID of the color.
 *        name:
 *          type: string
 *          description: The name of the color.
 *      example:
 *        id: 507f1f77bcf86cd799439011
 *        name: Red
 */

const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

const Color = mongoose.model('Color', colorSchema);

module.exports = Color;
