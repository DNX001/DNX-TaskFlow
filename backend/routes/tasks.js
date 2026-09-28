const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// POST /api/tasks
// Create a new task
router.post("/", async (req, res) => {
  try {
    const { title, priority } = req.body;

    // Validate title
    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Task title cannot be empty.",
      });
    }

    // Validate priority if one was provided
    const allowedPriorities = ["Low", "Medium", "High"];

    if (priority && !allowedPriorities.includes(priority)) {
      return res.status(400).json({
        message: "Priority must be Low, Medium, or High.",
      });
    }

    const task = await Task.create({
      title: title.trim(),
      priority: priority || "Medium",
    });

    res.status(201).json({
      message: "Task created successfully.",
      task,
    });
  } catch (error) {
    console.error("Error creating task:", error.message);

    res.status(500).json({
      message: "Server error while creating task.",
    });
  }
});

module.exports = router;