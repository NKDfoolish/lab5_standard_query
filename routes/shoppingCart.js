// Import the express module
const express = require('express');
// Import the database connection
const db = require('../db');

// Create a new router instance
const router = express.Router();

// Define a route to get all shopping carts
router.get('/', async (req, res) => {
    const [carts] = await db.query('SELECT * FROM shoppingCarts'); // Fetch all shopping carts from the database
    res.json(carts); // Send the shopping carts as a JSON response
});

// Define a route to create a new shopping cart
router.post('/', async (req, res) => {
    const { userId, productId, quantity } = req.body; // Extract userId, productId, and quantity from the request body
    const [result] = await db.query('INSERT INTO shoppingCarts (userId, productId, quantity) VALUES (?, ?, ?)', [userId, productId, quantity]); // Create a new shopping cart
    const [cart] = await db.query('SELECT * FROM shoppingCarts WHERE cartId = ?', [result.insertId]); // Fetch the created shopping cart
    res.json(cart); // Send the created shopping cart as a JSON response
});

// Define a route to update an existing shopping cart by ID
router.put('/:id', async (req, res) => {
    const { userId, productId, quantity } = req.body; // Extract userId, productId, and quantity from the request body
    await db.query('UPDATE shoppingCarts SET userId = ?, productId = ?, quantity = ? WHERE cartId = ?', [userId, productId, quantity, req.params.id]); // Update the shopping cart with the given ID
    const [cart] = await db.query('SELECT * FROM shoppingCarts WHERE cartId = ?', [req.params.id]); // Fetch the updated shopping cart
    res.json(cart); // Send the updated shopping cart as a JSON response
});

// Define a route to delete a shopping cart by ID
router.delete('/:id', async (req, res) => {
    await db.query('DELETE FROM shoppingCarts WHERE cartId = ?', [req.params.id]); // Delete the shopping cart with the given ID
    res.sendStatus(200); // Send a 200 OK status
});

// Export the router to be used in other parts of the application
module.exports = router;