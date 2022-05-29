const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

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
  if (password !== password2) errors.push({ msg: "passwords does not match" });

  // Check pass length
  if (password.length < 6)
    errors.push({ msg: "Password should be at least 6 characters" });

  if (errors.length > 0) {
    res.render("register", { errors, name, email, password, password2 });
  } else {
    // Validation Passed

    User.findOne({ email: email }).then((user) => {
      // User exists
      if (user) {
        errors.push({ msg: "Email is already registerd" });
        res.render("register", { errors, name, email, password, password2 });
      } else {
        const newUser = new User({
          name: name,
          email: email,
          password: password,
        });

        // Hash password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            // Set password hashed
            newUser.password = hash;

            newUser
              .save()
              .then(() => {
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
});

module.exports = router;
