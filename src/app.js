const express = require('express');
//const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

// Middleware
//app.use(cors());
app.use(express.json());

// Routes
const webServer = require('./api');
app.use('/api', webServer);

// Health check
app.get('/health', (req, res) => {
  res.json({ message: 'Server is running 🚀' });
});

module.exports = app;