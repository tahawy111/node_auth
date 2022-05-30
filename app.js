const express = require("express");
const app = express();
const passport = require("passport");
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");

// Passport Config
require("./config/passport")(passport);

// EJS
app.set("view engine", "ejs");

// BodyParser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Express Session
app.use(
  session({
    secret: "mmbkjmgstel 56756245ff kgjlo[few@75449.clhl.d",
    resave: false,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Static Folders
app.use(express.static("public"));

// Router
require("./routes")(app);

// DB Config
const db = require("./config/keys").MongoURI;
mongoose
  .connect(db)
  .then(() => {
    console.log("DB Connected...");
  })
  .catch((err) => console.log(err));

// Start Server
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
