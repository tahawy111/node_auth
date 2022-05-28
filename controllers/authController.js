const User = require("../models/User");
const express = require("express");
const register_get = (req, res) => {
  res.render("register");
};

const register_post = (req, res) => {
  const { username, password } = req.body;
  const user = User.findBy("username", username);
  if (user) return res.redirect("/auth/register");
  User.addUser({ username, password });
  return res.redirect("/auth/login");
};

const login_get = (req, res) => {
  res.render("login");
};

module.exports = { register_get, register_post, login_get };
