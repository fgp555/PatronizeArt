const express = require("express");
const passport = require("../config/passport-config");
const router = express.Router();

// Redirect to Google for authentication
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google callback route after authentication
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect("/profile");
  }
);

// Logout route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
