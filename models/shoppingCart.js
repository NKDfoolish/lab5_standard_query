// Import the DataTypes object from the sequelize module
const { DataTypes } = require('sequelize');
// Import the sequelize instance from the db module
const sequelize = require('../db');

// Define the ShoppingCart model with its attributes
const ShoppingCart = sequelize.define('ShoppingCart', {
    cartId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // Primary key, auto-incremented
    userId: { type: DataTypes.INTEGER, allowNull: false }, // Foreign key referencing User, cannot be null
    productId: { type: DataTypes.INTEGER, allowNull: false }, // Foreign key referencing Product, cannot be null
    quantity: { type: DataTypes.INTEGER, allowNull: false }, // Quantity of the product, cannot be null
});

// Export the ShoppingCart model to be used in other parts of the application
module.exports = ShoppingCart;
