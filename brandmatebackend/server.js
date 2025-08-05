const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Name = require('./models/Name');
const User = require('./models/User');
const { generateToken, authenticateToken, requireAdmin, optionalAuth } = require('./middleware/auth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/brandmate');
    console.log(`📊 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Connect to MongoDB
connectDB();

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

app.get('/api/health', async (req, res) => {
  try {
    // Check MongoDB connection
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    
    res.json({
      status: 'healthy',
      database: {
        status: dbStatus,
        name: mongoose.connection.name || 'unknown'
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      database: {
        status: 'error',
        error: error.message
      },
      timestamp: new Date().toISOString()
    });
  }
});

// Authentication Routes

// Register new user
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Username, email, and password are required'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(409).json({
        error: 'User exists',
        message: existingUser.email === email ? 'Email already registered' : 'Username already taken'
      });
    }

    // Create new user
    const newUser = new User({
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password
    });

    const savedUser = await newUser.save();

    // Generate JWT token
    const token = generateToken(savedUser._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: savedUser.toJSON(),
        token
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Validation error',
        message: error.message
      });
    }
    
    res.status(500).json({
      error: 'Server error',
      message: 'Error creating user account'
    });
  }
});

// Login user
app.post('/api/auth/login', async (req, res) => {
  try {
    const { login, password } = req.body;

    // Validation
    if (!login || !password) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Username/email and password are required'
      });
    }

    // Find user by username or email
    const user = await User.findOne({
      $or: [
        { email: login.toLowerCase() },
        { username: login }
      ]
    });

    if (!user) {
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'Invalid credentials'
      });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(401).json({
        error: 'Account deactivated',
        message: 'Your account has been deactivated'
      });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'Invalid credentials'
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: user.toJSON(),
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Error during login'
    });
  }
});

// Get current user profile (protected route)
app.get('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        user: req.user
      }
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Error fetching user profile'
    });
  }
});

// Logout user (client-side token removal, but we can track it)
app.post('/api/auth/logout', authenticateToken, async (req, res) => {
  try {
    // In a more advanced implementation, you might want to blacklist the token
    // For now, we'll just send a success response
    res.json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Error during logout'
    });
  }
});

// Names API endpoint - Save to MongoDB (now with optional authentication)
app.post('/api/names', async (req, res) => {
  try {
    const { fullName } = req.body;
    
    // Validation
    if (!fullName || fullName.trim().length === 0) {
      return res.status(400).json({
        error: 'Invalid input',
        message: 'Full name is required and cannot be empty'
      });
    }

    // Create new name document
    const newName = new Name({
      fullName: fullName.trim()
    });

    // Save to MongoDB
    const savedName = await newName.save();
    
    res.status(201).json({
      message: 'Name saved successfully!',
      data: {
        id: savedName._id,
        name: savedName.fullName,
        createdAt: savedName.createdAt,
        timestamp: savedName.createdAt.toISOString()
      }
    });
  } catch (error) {
    console.error('Error saving name to MongoDB:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Validation error',
        message: error.message
      });
    }
    
    res.status(500).json({
      error: 'Server error',
      message: 'Error saving the name to database'
    });
  }
});

// Get all saved names from MongoDB
app.get('/api/names', async (req, res) => {
  try {
    const { limit = 50, page = 1 } = req.query;
    const skip = (page - 1) * limit;
    
    // Get names with pagination
    const names = await Name.find({})
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);
    
    // Get total count for pagination
    const totalCount = await Name.countDocuments();
    
    // Format the response
    const formattedNames = names.map(name => ({
      id: name._id,
      fullName: name.fullName,
      createdAt: name.createdAt,
      timestamp: name.createdAt.toISOString()
    }));
    
    res.json({
      success: true,
      count: names.length,
      totalCount,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalCount / limit),
      data: formattedNames
    });
  } catch (error) {
    console.error('Error fetching names from MongoDB:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Error retrieving names from database'
    });
  }
});

// Get a specific name by ID
app.get('/api/names/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: 'Invalid ID',
        message: 'Please provide a valid name ID'
      });
    }
    
    const name = await Name.findById(id);
    
    if (!name) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Name not found'
      });
    }
    
    res.json({
      success: true,
      data: {
        id: name._id,
        fullName: name.fullName,
        createdAt: name.createdAt,
        updatedAt: name.updatedAt,
        timestamp: name.createdAt.toISOString()
      }
    });
  } catch (error) {
    console.error('Error fetching name by ID:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Error retrieving name from database'
    });
  }
});

// Delete a name by ID (optional - for admin purposes)
app.delete('/api/names/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: 'Invalid ID',
        message: 'Please provide a valid name ID'
      });
    }
    
    const deletedName = await Name.findByIdAndDelete(id);
    
    if (!deletedName) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Name not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Name deleted successfully',
      data: {
        id: deletedName._id,
        fullName: deletedName.fullName
      }
    });
  } catch (error) {
    console.error('Error deleting name:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Error deleting name from database'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler - must be last
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

app.listen(PORT, () => {
  console.log(`🚀 BrandMate Backend server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Access at: http://localhost:${PORT}`);
});