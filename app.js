// App Sittings
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const expressLayouts = require("express-ejs-layouts");
// app sittings

// Passport Sittings

// Middlewares

// Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");
app.use(express.json());

// Static Folders
app.use(express.static("public"));

// End Middlewares

// Start Server
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
