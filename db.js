// Import the Sequelize constructor from the sequelize module
const { Sequelize } = require('sequelize');

// Create a new Sequelize instance, connecting to the 'lab5' database with username 'root' and password 'root'
const sequelize = new Sequelize('lab5', 'root', 'root', {
    host: 'localhost', // Database host
    dialect: 'mysql', // Database dialect (MySQL)
});

// Authenticate the connection to the database
sequelize.authenticate()
    .then(() => console.log('Database connected.')) // Log success message if connection is successful
    .catch(err => console.error('Database connection failed:', err)); // Log error message if connection fails

// Export the sequelize instance to be used in other parts of the application
module.exports = sequelize;
