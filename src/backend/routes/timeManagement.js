const express = require("express");
const router = express.Router();
const TimeManagement = require("../models/TimeManagement");

// Get all time entries
router.get("/", async (req, res) => {
  try {
    const timeEntries = await TimeManagement.find();
    res.json(timeEntries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get time entries by employee
router.get("/employee/:employeeNo", async (req, res) => {
  try {
    const timeEntries = await TimeManagement.find({ employeeNo: req.params.employeeNo });
    res.json(timeEntries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one time entry
router.get("/:id", async (req, res) => {
  try {
    const timeEntry = await TimeManagement.findOne({ lineNo: req.params.id });
    if (!timeEntry) {
      return res.status(404).json({ message: "Time entry not found" });
    }
    res.json(timeEntry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create time entry
router.post("/", async (req, res) => {
  const timeEntry = new TimeManagement({
    lineNo: req.body.lineNo,
    employeeNo: req.body.employeeNo,
    activityCode: req.body.activityCode,
    description: req.body.description,
    startTime: req.body.startTime,
    endTime: req.body.endTime
  });

  try {
    const newTimeEntry = await timeEntry.save();
    res.status(201).json(newTimeEntry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update time entry
router.patch("/:id", async (req, res) => {
  try {
    const timeEntry = await TimeManagement.findOne({ lineNo: req.params.id });
    if (!timeEntry) {
      return res.status(404).json({ message: "Time entry not found" });
    }

    Object.keys(req.body).forEach(key => {
      if (req.body[key] != null) {
        timeEntry[key] = req.body[key];
      }
    });

    const updatedTimeEntry = await timeEntry.save();
    res.json(updatedTimeEntry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete time entry
router.delete("/:id", async (req, res) => {
  try {
    const timeEntry = await TimeManagement.findOne({ lineNo: req.params.id });
    if (!timeEntry) {
      return res.status(404).json({ message: "Time entry not found" });
    }

    await timeEntry.remove();
    res.json({ message: "Time entry deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 