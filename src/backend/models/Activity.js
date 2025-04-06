const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  totalHoursBooked: {
    type: Number,
    required: true,
    default: 0
  },
  totalHoursAvailable: {
    type: Number,
    required: true,
    default: 160
  },
  ignoreTotalHoursAvailableCheck: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Activity", activitySchema); 