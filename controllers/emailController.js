// Import the nodemailer module
const nodemailer = require('nodemailer');

// Define the sendEmail function to handle sending emails
const sendEmail = async (req, res) => {
    // Extract email and content from the request body
    const { email, content } = req.body;

    // Create a transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use Gmail as the email service
        auth: { 
            user: 'your-username-account', // Your Gmail address
            pass: 'your-pass-word' // Your Gmail app password
        },
    });

    // Send an email using the transporter object
    await transporter.sendMail({
        from: 'your-username-account', // Sender address
        to: email, // List of receivers
        subject: 'Message from Lab5', // Subject line
        text: content, // Plain text body
    });

    // Send a JSON response indicating that the email was sent
    res.json({ message: 'Email sent!' });
};

// Export the sendEmail function to be used in other parts of the application
module.exports = { sendEmail };
