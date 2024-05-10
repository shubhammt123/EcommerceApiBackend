const express = require('express');
const router = express.Router();
const category = require('../controller/category');

/**
 * @swagger
 * /category/categories:
 *   get:
 *     summary: Retrieve a list of all categories
 *     description: Returns a list of all categories in the database.
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Server error
 */
router.get('/categories', category.getAllCategory);

/**
 * @swagger
 * /category/categories/{id}:
 *   get:
 *     summary: Retrieve a single category by ID
 *     description: Provides detailed information about a category with the specified ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the category to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
router.get('/categories/:id', category.getCategoryById);

/**
 * @swagger
 * /category/categories:
 *   post:
 *     summary: Add a new category
 *     description: Creates a new category in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/categories', category.AddCategory);

/**
 * @swagger
 * /category/categories/{id}:
 *   put:
 *     summary: Update an existing category
 *     description: Updates details of an existing category by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the category to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put('/categories/:id', category.updateCategory);

/**
 * @swagger
 * /category/categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     description: Deletes a category from the database by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the category to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
router.delete('/categories/:id', category.deleteCategory);

module.exports = router;
