// Import the DataTypes object from the sequelize module
const { DataTypes } = require('sequelize');
// Import the sequelize instance from the db module
const sequelize = require('../db');

// Define the Product model with its attributes
const Product = sequelize.define('Product', {
    productId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // Primary key, auto-incremented
    productName: { type: DataTypes.STRING, allowNull: false }, // Product name, cannot be null
    price: { type: DataTypes.FLOAT, allowNull: false }, // Product price, cannot be null
    manufacturingDate: { type: DataTypes.DATE, allowNull: false }, // Manufacturing date, cannot be null
});

// Export the Product model to be used in other parts of the application
module.exports = Product;
