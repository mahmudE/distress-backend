// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services like SendGrid, Mailgun, etc.
    auth: {
        user: 'meharuna195@gmail.com', // Your email
        pass: 'inthenameofgod' // Your email password or app-specific password
    }
});

// Endpoint to handle distress messages
app.post('/api/distress', (req, res) => {
    const { message, latitude, longitude } = req.body;

    console.log('Received distress message:', { message, latitude, longitude });

    // Prepare email options
    const mailOptions = {
        from: 'meharuna195@gmail.com', // Sender address
        to: 'oppaiandd@gmail.com', // Law enforcement email address
        subject: 'Distress Alert',
        text: `Distress message: ${message}\nLocation: https://www.google.com/maps?q=${latitude},${longitude}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ status: 'error', message: 'Failed to send distress message' });
        }
        console.log('Email sent:', info.response);
        res.status(200).json({ status: 'success', message: 'Distress message received and sent to law enforcement' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
