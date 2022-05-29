const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// BodyParser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Express Session
app.use(
  session({
    secret: "mmbkjmgstel 56756245ff kgjlo[few@75449.clhl.d",
    resave: true,
    saveUninitialized: true,
  })
);

// Connect flash
app.use(flash());

// Global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
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
