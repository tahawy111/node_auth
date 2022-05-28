const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
app.use(express.json());
app.set("view engine", "ejs");

// Static Folders
app.use(express.static("public"));

// Router
app.use(require("./routes/router"));

// Start Server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
