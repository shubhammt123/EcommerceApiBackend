const express = require('express');
const router = express.Router();
const color = require('../controller/color');

/**
 * @swagger
 * /color/colors:
 *   get:
 *     summary: Retrieve all colors
 *     description: Returns a list of all colors.
 *     responses:
 *       200:
 *         description: A list of colors.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Color'
 *       500:
 *         description: Server error
 */
router.get('/colors', color.getAllColor);

/**
 * @swagger
 * /color/colors/{id}:
 *   get:
 *     summary: Retrieve a color by ID
 *     description: Provides detailed information about a color with the specified ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the color to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detailed information about the color.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Color'
 *       404:
 *         description: Color not found
 *       500:
 *         description: Server error
 */
router.get('/colors/:id', color.getColorById);

/**
 * @swagger
 * /color/colors:
 *   post:
 *     summary: Add a new color
 *     description: Creates a new color in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Color'
 *     responses:
 *       201:
 *         description: Color created successfully.
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/colors', color.AddColor);

/**
 * @swagger
 * /color/colors/{id}:
 *   put:
 *     summary: Update a color
 *     description: Updates an existing color by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the color to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Color'
 *     responses:
 *       200:
 *         description: Color updated successfully.
 *       404:
 *         description: Color not found
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put('/colors/:id', color.updateColor);

/**
 * @swagger
 * /color/colors/{id}:
 *   delete:
 *     summary: Delete a color
 *     description: Deletes a color from the database by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the color to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Color deleted successfully.
 *       404:
 *         description: Color not found
 *       500:
 *         description: Server error
 */
router.delete('/colors/:id', color.deleteColor);

module.exports = router;
