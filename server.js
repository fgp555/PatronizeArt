const express = require("express");
const session = require("express-session");
const passport = require("./config/passport-config");
const authRoutes = require("./routes/auth");
const indexRoutes = require("./routes/index");
const profileRoutes = require("./routes/profile");
const downloadRoutes = require("./routes/download");
const videosRoutes = require("./routes/videos");
const ensureAuthenticated = require("./middleware/authentication");

const app = express();

app.use(session({ secret: "your-secret-key", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));

app.set("view engine", "ejs");

app.use("/", indexRoutes);
app.use("/", authRoutes);
app.use("/", profileRoutes);
app.use("/", downloadRoutes);
app.use("/", videosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
