const express = require("express");
const router = express.Router();
const allControllers = require("../controllers");
const authController = require("../controllers");

router.get("/", allControllers.homeController);
router.get("/auth/rigister", (req, res) => {
  res.render("rigister");
});

router.post("/auth/rigister", (req, res) => {
  const { username, password } = req.body;
  const user = User.findBy("username", username);
  if (user) return res.redirect("/auth/rigister");
  User.addUser({ username, password });
  return res.redirect("/auth/login");
});

router.get("/auth/login", (req, res) => {
  res.render("login");
});

module.exports = router;
