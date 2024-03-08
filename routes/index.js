const express = require("express");
const router = express.Router();

// Home route
router.get("/", (req, res) => {
  // Log user object to the console
  console.log("User Object:", req.user);

  // Render index.ejs with user information if authenticated
  res.render("index", { user: req.user });
});

module.exports = router;
