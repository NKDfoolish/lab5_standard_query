// Import the express module
const express = require('express');
// Import the database connection
const db = require('../db');

// Create a new router instance
const router = express.Router();

// Define a route to get all products
router.get('/', async (req, res) => {
    const [products] = await db.query('SELECT * FROM products'); // Fetch all products from the database
    res.json(products); // Send the products as a JSON response
});

// Define a route to create a new product
router.post('/', async (req, res) => {
    const { name, price, description } = req.body; // Extract product details from the request body
    const [result] = await db.query('INSERT INTO products (name, price, description) VALUES (?, ?, ?)', [name, price, description]); // Create a new product
    const [product] = await db.query('SELECT * FROM products WHERE productId = ?', [result.insertId]); // Fetch the created product
    res.json(product); // Send the created product as a JSON response
});

// Define a route to update an existing product by ID
router.put('/:id', async (req, res) => {
    const { name, price, description } = req.body; // Extract product details from the request body
    await db.query('UPDATE products SET name = ?, price = ?, description = ? WHERE productId = ?', [name, price, description, req.params.id]); // Update the product with the given ID
    const [product] = await db.query('SELECT * FROM products WHERE productId = ?', [req.params.id]); // Fetch the updated product
    res.json(product); // Send the updated product as a JSON response
});

// Define a route to delete a product by ID
router.delete('/:id', async (req, res) => {
    await db.query('DELETE FROM products WHERE productId = ?', [req.params.id]); // Delete the product with the given ID
    res.sendStatus(200); // Send a 200 OK status
});

// Export the router to be used in other parts of the application
module.exports = router;