// Import the express module
const express = require('express');
// Import the database connection
const db = require('../db');

// Create a new router instance
const router = express.Router();

// CRUD Operations

// Define a route to get all users
router.get('/', async (req, res) => {
    const [users] = await db.query('SELECT * FROM users'); // Fetch all users from the database
    res.json(users); // Send the users as a JSON response
});

// Define a route to create a new user
router.post('/', async (req, res) => {
    const { name, email, password } = req.body; // Extract user details from the request body
    const [result] = await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]); // Create a new user
    const [user] = await db.query('SELECT * FROM users WHERE userId = ?', [result.insertId]); // Fetch the created user
    res.json(user); // Send the created user as a JSON response
});

// Define a route to update an existing user by ID
router.put('/:id', async (req, res) => {
    const { name, email, password } = req.body; // Extract user details from the request body
    await db.query('UPDATE users SET name = ?, email = ?, password = ? WHERE userId = ?', [name, email, password, req.params.id]); // Update the user with the given ID
    const [user] = await db.query('SELECT * FROM users WHERE userId = ?', [req.params.id]); // Fetch the updated user
    res.json(user); // Send the updated user as a JSON response
});

// Define a route to delete a user by ID
router.delete('/:id', async (req, res) => {
    await db.query('DELETE FROM users WHERE userId = ?', [req.params.id]); // Delete the user with the given ID
    res.sendStatus(200); // Send a 200 OK status
});

// Export the router to be used in other parts of the application
module.exports = router;