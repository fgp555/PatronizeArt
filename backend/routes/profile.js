const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../middleware/authentication");

// Profile route
router.get("/profile", ensureAuthenticated, (req, res) => {
  // Render profile.ejs with user information if authenticated
  res.render("profile", { user: req.user });
});

module.exports = router;
