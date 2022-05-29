const express = require("express");
const router = express.Router();

// Login  Page
router.get("/login", (req, res) => {
  res.render("login");
});

// Register  Page
router.get("/register", (req, res) => {
  res.render("register");
});
// Register  Handle
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // Check required fields
  if (!name || !email || !password || !password2)
    errors.push({ msg: "Please Fill in all Feilds" });

  // Check password match
  if (password !== password2) errors.push({ msg: "password do not match" });

  // Check pass length
  if (password.length < 6)
    errors.push({ msg: "Password should be at least 6 characters" });

  if (errors.length > 0) {
    res.render("register", { errors });
  } else {
    res.send("pass");
  }
});

module.exports = router;
