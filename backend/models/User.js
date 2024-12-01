const mongoose = require('mongoose');

// User schema
const userSchema = new mongoose.Schema({
  userType: {
    type: String,
    required: true,
    enum: ['client', 'fleetOwner'], // Limit userType to either client or fleetOwner
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure unique email
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  additionalInfo: {
    type: String,
    required: true, // For fleet owner, it might contain truck info
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
