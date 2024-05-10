const express = require('express');
const router = express.Router();
const collection = require('../controller/collection');

/**
 * @swagger
 * /collection/collections:
 *   get:
 *     summary: Retrieve all collections
 *     description: Returns a list of all collections in the database.
 *     responses:
 *       200:
 *         description: An array of collections.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Collection'
 *       500:
 *         description: Server error
 */
router.get('/collections', collection.getAllCollection);

/**
 * @swagger
 * /collection/collections/{id}:
 *   get:
 *     summary: Retrieve a collection by ID
 *     description: Provides detailed information about a specific collection.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the collection
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single collection
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Collection'
 *       404:
 *         description: Collection not found
 *       500:
 *         description: Server error
 */
router.get('/collections/:id', collection.getCollectionById);

/**
 * @swagger
 * /collection/collections:
 *   post:
 *     summary: Create a new collection
 *     description: Adds a new collection to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Collection'
 *     responses:
 *       201:
 *         description: Collection created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/collections', collection.AddCollection);

/**
 * @swagger
 * /collection/collections/{id}:
 *   put:
 *     summary: Update a collection
 *     description: Updates an existing collection by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the collection to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Collection'
 *     responses:
 *       200:
 *         description: Collection updated successfully
 *       404:
 *         description: Collection not found
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put('/collections/:id', collection.updateCollection);

/**
 * @swagger
 * /collection/collections/{id}:
 *   delete:
 *     summary: Delete a collection
 *     description: Deletes a collection from the database by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the collection to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Collection deleted successfully
 *       404:
 *         description: Collection not found
 *       500:
 *         description: Server error
 */
router.delete('/collections/:id', collection.deleteCollection);

module.exports = router;
