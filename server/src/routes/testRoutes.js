const express = require("express");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/member", protect, (req, res) => {
  res.json({
    success: true,
    message: `Welcome ${req.user.name}`,
    role: req.user.role,
  });
});

router.get(
  "/admin",
  protect,
  authorizeRoles("ADMIN"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin",
    });
  }
);

module.exports = router;