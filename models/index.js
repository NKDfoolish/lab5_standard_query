// Import the sequelize instance from the db module
const sequelize = require('../db');

// Import the User model from the user module
const User = require('./user');

// Import the Product model from the product module
const Product = require('./product');

// Import the ShoppingCart model from the shoppingCart module
const ShoppingCart = require('./shoppingCart');

// Define the associations between the models
User.hasMany(ShoppingCart, { foreignKey: 'userId' }); // A User can have many ShoppingCart entries
ShoppingCart.belongsTo(User, { foreignKey: 'userId' }); // Each ShoppingCart entry belongs to a User

Product.hasMany(ShoppingCart, { foreignKey: 'productId' }); // A Product can have many ShoppingCart entries
ShoppingCart.belongsTo(Product, { foreignKey: 'productId' }); // Each ShoppingCart entry belongs to a Product

// Sync the models with the database, altering tables if necessary
sequelize.sync({ alter: true })
    .then(() => console.log('Database synced.')) // Log success message
    .catch(err => console.error('Sync failed:', err)); // Log error message if sync fails

// Export the models to be used in other parts of the application
module.exports = { User, Product, ShoppingCart };
