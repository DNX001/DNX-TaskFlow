const express = require("express");
const mongoose = require("mongoose");
const Task = require("../models/Task");

const router = express.Router();

// GET /api/tasks
// Get all tasks, optionally filtered by priority
router.get("/", async (req, res) => {
  try {
    const { priority } = req.query;

    const allowedPriorities = ["Low", "Medium", "High"];

    // Validate priority if provided
    if (priority && !allowedPriorities.includes(priority)) {
      return res.status(400).json({
        message: "Priority must be Low, Medium, or High.",
      });
    }

    // Build MongoDB filter
    const filter = {};

    if (priority) {
      filter.priority = priority;
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error.message);

    res.status(500).json({
      message: "Server error while fetching tasks.",
    });
  }
});

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

// PUT /api/tasks/complete-all
// Mark all pending tasks as completed
router.put("/complete-all", async (req, res) => {
  try {
    const result = await Task.updateMany(
      { completed: false },
      { $set: { completed: true } }
    );

    res.status(200).json({
      message: "All tasks marked as completed.",
      updatedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Error completing all tasks:", error.message);

    res.status(500).json({
      message: "Server error while completing all tasks.",
    });
  }
});

// PUT /api/tasks/:id/complete
// Mark a single task as completed
router.put("/:id/complete", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid task ID.",
      });
    }

    // Find the task
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found.",
      });
    }

    // Prevent completing an already completed task
    if (task.completed) {
      return res.status(400).json({
        message: "Task is already completed.",
      });
    }

    // Mark as completed and save
    task.completed = true;
    await task.save();

    res.status(200).json({
      message: "Task marked as completed.",
      task,
    });
  } catch (error) {
    console.error("Error completing task:", error.message);

    res.status(500).json({
      message: "Server error while completing task.",
    });
  }
});

module.exports = router;