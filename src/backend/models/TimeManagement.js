const mongoose = require("mongoose");

const timeManagementSchema = new mongoose.Schema({
  lineNo: {
    type: String,
    required: true,
    unique: true
  },
  employeeNo: {
    type: String,
    required: true,
    ref: "Employee"
  },
  activityCode: {
    type: String,
    required: true,
    ref: "Activity"
  },
  description: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("TimeManagement", timeManagementSchema); 