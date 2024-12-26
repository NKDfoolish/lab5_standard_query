// Import the express module
const express = require('express');
// Import the body-parser module to parse JSON request bodies
const bodyParser = require('body-parser');
// Import the user routes
const userRoutes = require('./routes/users');
// Import the product routes
const productRoutes = require('./routes/products');
// Import the shopping cart routes
const shoppingCartRoutes = require('./routes/shoppingCart');
// Import the sendEmail function from the email controller
const { sendEmail } = require('./controllers/emailController');
// Import the upload instance from the file controller
const { upload } = require('./controllers/fileController');
// Import the fetchAndSaveUsers function from the external API controller
const { fetchAndSaveUsers } = require('./controllers/externalApiController');

// Create a new Express application
const app = express();

// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());
// Use the user routes for requests to /users
app.use('/users', userRoutes);
// Use the product routes for requests to /products
app.use('/products', productRoutes);
// Use the shopping cart routes for requests to /shoppingCarts
app.use('/shoppingCarts', shoppingCartRoutes);

// Define an endpoint to send emails
app.post('/sendEmail', sendEmail);

// Define an endpoint to handle image uploads
app.post('/uploadImage', upload.single('image'), (req, res) => res.json({ file: req.file }));
// Define an endpoint to serve uploaded images
app.get('/images/:filename', (req, res) => res.sendFile(`/uploads/${req.params.filename}`, { root: __dirname }));

// Define an endpoint to fetch users from an external API and save them to the database
app.get('/fetchUsers', fetchAndSaveUsers);

// Start the server and listen on port 3000
app.listen(3000, () => console.log('Server running on port 3000'));
