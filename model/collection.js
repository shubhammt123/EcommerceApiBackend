/**
 * @swagger
 * components:
 *  schemas:
 *    Collection:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated ID of the collection type.
 *        name:
 *          type: string
 *          description: The name of the collection type.
 *      example:
 *        id: 5f8d04fe1234567890123456
 *        name: Limited Edition
 */

const mongoose = require('mongoose');

const collectionTypeSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

const CollectionType = mongoose.model('CollectionType', collectionTypeSchema);

module.exports = CollectionType;
