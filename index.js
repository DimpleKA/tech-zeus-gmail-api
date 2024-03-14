const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Use the cors middleware
app.use(cors());

// Initialize Gmail password variable
let gmailPassword = '';

// POST endpoint to send email
app.post('/send-email', (req, res) => {
    const { recipientEmail, subject, text, password } = req.body;

    // Check if required fields are present
    if (!recipientEmail || !subject || !text || !password) {
        return res.status(400).send('Missing required fields');
    }

    // Update the Gmail password
    gmailPassword = password;

    // Nodemailer transporter setup using the received password
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'techzeusbanglore@gmail.com', // Your Gmail email address
            pass: gmailPassword // Gmail password obtained from the fetch API
        }
    });

    // Email options
    const mailOptions = {
        from: 'techzeusbanglore@gmail.com', // Your Gmail email address
        to: recipientEmail,  // get the data from the form
        subject: subject,
        text: text
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Email sending failed');
        } else {
            console.log('Email sent: ' + info.response);
            return res.send('Email sent successfully');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
