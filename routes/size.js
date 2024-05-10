const express = require('express');
const router = express.Router();
const size = require('../controller/size');

/**
 * @swagger
 * /sizes/size:
 *   get:
 *     summary: Retrieve all sizes
 *     description: Returns a list of all sizes.
 *     responses:
 *       200:
 *         description: A list of sizes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Size'
 *       500:
 *         description: Server error
 */
router.get('/size', size.getAllSize);

/**
 * @swagger
 * /sizes/size/{id}:
 *   get:
 *     summary: Retrieve a size by ID
 *     description: Provides detailed information about a specific size.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the size to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detailed information about the size.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Size'
 *       404:
 *         description: Size not found
 *       500:
 *         description: Server error
 */
router.get('/size/:id', size.getSizeById);

/**
 * @swagger
 * /sizes/size:
 *   post:
 *     summary: Add a new size
 *     description: Creates a new size in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Size'
 *     responses:
 *       201:
 *         description: Size created successfully.
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/size', size.AddSize);

/**
 * @swagger
 * /sizes/size/{id}:
 *   put:
 *     summary: Update a size
 *     description: Updates an existing size by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the size to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Size'
 *     responses:
 *       200:
 *         description: Size updated successfully.
 *       404:
 *         description: Size not found
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put('/size/:id', size.updateSize);

/**
 * @swagger
 * /sizes/size/{id}:
 *   delete:
 *     summary: Delete a size
 *     description: Deletes a size from the database by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the size to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Size deleted successfully.
 *       404:
 *         description: Size not found
 *       500:
 *         description: Server error
 */
router.delete('/size/:id', size.deleteSize);

module.exports = router;
