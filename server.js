const express = require("express");
const fs = require("fs");
const { dirname } = require("path");
const path = require("path");
const app = express();
const port = process.env.PORT || 8080;

// middleware/data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// setup all routes in seperate folder to ensure cleaner server.js
require("./routes/routes")(app);

// lets server listen
app.listen(port, function () {
  console.log(`Listening on port: ${port}`);
});
