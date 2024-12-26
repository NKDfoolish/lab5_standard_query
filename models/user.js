// Import the DataTypes object from the sequelize module
const { DataTypes } = require('sequelize');
// Import the sequelize instance from the db module
const sequelize = require('../db');

// Define the User model with its attributes
const User = sequelize.define('User', {
    userId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // Primary key, auto-incremented
    fullName: { type: DataTypes.STRING, allowNull: false }, // Full name of the user, cannot be null
    address: { type: DataTypes.STRING, allowNull: false }, // Address of the user, cannot be null
    registrationDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }, // Registration date, defaults to current date and time
});

// Export the User model to be used in other parts of the application
module.exports = User;
