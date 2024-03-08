const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../middleware/authentication");

// Videos route
router.get("/videos", ensureAuthenticated, (req, res) => {
  // Render videos.ejs with user information if authenticated
  res.render("videos", { user: req.user });
});

module.exports = router;
