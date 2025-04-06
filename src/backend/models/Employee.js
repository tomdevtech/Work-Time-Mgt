const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  employeeNo: {
    type: String,
    required: true,
    unique: true
  },
  surname: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  streetName: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  totalCountHoursPerMonth: {
    type: Number,
    required: true,
    default: 160
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Employee", employeeSchema); 