const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('combined')); // Logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'BrandMate Backend API',
    version: '1.0.0',
    status: 'running'
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Names API endpoint
app.post('/api/names', (req, res) => {
  const { fullName } = req.body;
  
  // Validation
  if (!fullName || fullName.trim().length === 0) {
    return res.status(400).json({
      error: 'Invalid input',
      message: 'Full name is required and cannot be empty'
    });
  }

  // Create names.txt file path
  const filePath = path.join(__dirname, 'names.txt');
  const nameEntry = `${fullName.trim()} - ${new Date().toISOString()}\n`;

  // Append name to file
  fs.appendFile(filePath, nameEntry, (err) => {
    if (err) {
      console.error('Error saving name:', err);
      return res.status(500).json({
        error: 'Server error',
        message: 'Error saving the name to file'
      });
    }
    
    res.status(200).json({
      message: 'Name saved successfully!',
      name: fullName.trim(),
      timestamp: new Date().toISOString()
    });
  });
});

// Get all saved names
app.get('/api/names', (req, res) => {
  const filePath = path.join(__dirname, 'names.txt');
  
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        return res.json({ names: [] });
      }
      console.error('Error reading names file:', err);
      return res.status(500).json({
        error: 'Server error',
        message: 'Error reading names file'
      });
    }
    
    const names = data.split('\n').filter(line => line.trim().length > 0);
    res.json({ names });
  });
});

// API Routes placeholder - will be expanded later
// app.use('/api', apiRoutes);

// 404 handler for all unmatched routes
// app.all('*', (req, res) => {
//   res.status(404).json({
//     error: 'Route not found',
//     message: `Cannot ${req.method} ${req.originalUrl}`
//   });
// });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 BrandMate Backend server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Access at: http://localhost:${PORT}`);
});