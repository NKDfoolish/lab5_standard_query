// Import the axios module for making HTTP requests
const axios = require('axios');

// Import the User model from the models directory
const { User } = require('../models');

// Define the fetchAndSaveUsers function to fetch users from an external API and save them to the database
const fetchAndSaveUsers = async (req, res) => {
    // Make a GET request to the external API to fetch users
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');

    // Use the bulkCreate method to insert multiple user records into the database
    await User.bulkCreate(data.map(user => ({
        fullName: user.name, // Map the name field from the API response to the fullName field in the User model
        address: user.address.city, // Map the address field from the API response to the address field in the User model
    })));

    // Send a JSON response indicating that the users were saved
    res.json({ message: 'Users saved.' });
};

// Export the fetchAndSaveUsers function to be used in other parts of the application
module.exports = { fetchAndSaveUsers };
