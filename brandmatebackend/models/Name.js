const mongoose = require('mongoose');

const nameSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
nameSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create indexes for better query performance
nameSchema.index({ createdAt: -1 });
nameSchema.index({ fullName: 1 });

module.exports = mongoose.model('Name', nameSchema);