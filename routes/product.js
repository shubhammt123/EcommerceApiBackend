const express = require('express');
const router = express.Router();
const product = require('../controller/product');

/**
 * @swagger
 * /product/products:
 *   get:
 *     summary: Retrieve a list of all products
 *     description: Returns a list of all products in the database.
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Error occurred
 */
router.get('/products', product.getAllProducts);

/**
 * @swagger
 * /product/products/{id}:
 *   get:
 *     summary: Retrieve a single product by ID
 *     description: Provides detailed information about a product with the specified ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the product to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Error occurred
 */
router.get('/products/:id', product.getProductById);

/**
 * @swagger
 * /product/products:
 *   post:
 *     summary: Add a new product
 *     description: Creates a new product in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Error occurred
 */
router.post('/products', product.AddProduct);

/**
 * @swagger
 * /product/products/{id}:
 *   put:
 *     summary: Update an existing product
 *     description: Updates details of an existing product by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the product to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Error occurred
 */
router.put('/products/:id', product.updateProduct);

/**
 * @swagger
 * /product/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     description: Deletes a product from the database by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Error occurred
 */
router.delete('/products/:id', product.deleteProduct);

module.exports = router;
