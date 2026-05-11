const express = require("express");

const protect = require("../middleware/authMiddleware");

const adminMiddleware = require("../middleware/adminMiddleware");

const {
  getAllTasks,
  createTask,
  getProjectTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

router.get("/", protect, getAllTasks);

router.post("/:projectId", protect, adminMiddleware, createTask);

router.get("/:projectId", protect, getProjectTasks);

router.put("/:taskId", protect, updateTask);

router.delete("/:taskId", protect, adminMiddleware, deleteTask);

module.exports = router;