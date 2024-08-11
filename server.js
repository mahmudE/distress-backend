// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint to handle distress messages
app.post('/api/distress', (req, res) => {
  const { message, latitude, longitude } = req.body;

  console.log('Received distress message:', { message, latitude, longitude });

  // Here, you could add logic to send the message to law enforcement
  // For example, sending an email, SMS, or saving to a database

  res.status(200).json({ status: 'success', message: 'Distress message received' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
