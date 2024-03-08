const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../middleware/authentication");

// Download route
router.get("/download", ensureAuthenticated, (req, res) => {
  // Render download.ejs with user information if authenticated
  res.render("download", { user: req.user });
});

module.exports = router;
