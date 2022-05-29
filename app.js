const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "ejs");

// Static Folders
app.use(express.static("public"));

// Router
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

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
