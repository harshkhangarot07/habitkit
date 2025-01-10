const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  color: {
    type: String,
    default: '#6200ee',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  completions: [{
    date: {
      type: Date,
      required: true,
    },
    value: {
      type: Number,
      default: 1,
    },
  }],
}, { timestamps: true });

module.exports = mongoose.model('Habit', habitSchema);