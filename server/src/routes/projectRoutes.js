const express = require("express");

const protect = require("../middleware/authMiddleware");

const adminMiddleware = require("../middleware/adminMiddleware");

const {
  createProject,
  getProjects,
  getSingleProject,
  updateProject,
  deleteProject,
  addMemberToProject,
} = require("../controllers/projectController");

const router = express.Router();

router.post("/", protect, adminMiddleware, createProject);

router.get("/", protect, getProjects);

router.get("/:id", protect, getSingleProject);

router.put("/:id", protect, updateProject);

router.delete("/:id", protect, adminMiddleware, deleteProject);

router.put("/:id/add-member", protect, adminMiddleware, addMemberToProject);

module.exports = router;
