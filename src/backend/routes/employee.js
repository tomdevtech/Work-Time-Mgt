const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

// Get all employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one employee
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findOne({ employeeNo: req.params.id });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create employee
router.post("/", async (req, res) => {
  const employee = new Employee({
    employeeNo: req.body.employeeNo,
    surname: req.body.surname,
    lastName: req.body.lastName,
    role: req.body.role,
    streetName: req.body.streetName,
    zipCode: req.body.zipCode,
    city: req.body.city,
    totalCountHoursPerMonth: req.body.totalCountHoursPerMonth || 160
  });

  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update employee
router.patch("/:id", async (req, res) => {
  try {
    const employee = await Employee.findOne({ employeeNo: req.params.id });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    Object.keys(req.body).forEach(key => {
      if (req.body[key] != null) {
        employee[key] = req.body[key];
      }
    });

    const updatedEmployee = await employee.save();
    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete employee
router.delete("/:id", async (req, res) => {
  try {
    const employee = await Employee.findOne({ employeeNo: req.params.id });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    await employee.remove();
    res.json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 