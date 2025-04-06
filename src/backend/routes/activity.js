const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity");

// Get all activities
router.get("/", async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one activity
router.get("/:id", async (req, res) => {
  try {
    const activity = await Activity.findOne({ code: req.params.id });
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.json(activity);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create activity
router.post("/", async (req, res) => {
  const activity = new Activity({
    code: req.body.code,
    description: req.body.description,
    totalHoursBooked: req.body.totalHoursBooked || 0,
    totalHoursAvailable: req.body.totalHoursAvailable || 160,
    ignoreTotalHoursAvailableCheck: req.body.ignoreTotalHoursAvailableCheck || false
  });

  try {
    const newActivity = await activity.save();
    res.status(201).json(newActivity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update activity
router.patch("/:id", async (req, res) => {
  try {
    const activity = await Activity.findOne({ code: req.params.id });
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    Object.keys(req.body).forEach(key => {
      if (req.body[key] != null) {
        activity[key] = req.body[key];
      }
    });

    const updatedActivity = await activity.save();
    res.json(updatedActivity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete activity
router.delete("/:id", async (req, res) => {
  try {
    const activity = await Activity.findOne({ code: req.params.id });
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    await activity.remove();
    res.json({ message: "Activity deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 