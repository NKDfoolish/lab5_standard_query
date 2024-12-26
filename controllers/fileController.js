// Import the multer module for handling file uploads
const multer = require('multer');
// Import the path module for handling and transforming file paths
const path = require('path');

// Define the storage configuration for multer
const storage = multer.diskStorage({
    // Set the destination directory for uploaded files
    destination: 'uploads/',
    // Define the filename format for uploaded files
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

// Create the multer upload instance with the defined storage configuration
const upload = multer({ storage });

// Export the upload instance to be used in other parts of the application
module.exports = { upload };
