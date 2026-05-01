const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
    required: true
  },
  eventType: {
    type: String,
    required: true
  },
  metadata: {
    type: Object
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Event', eventSchema);