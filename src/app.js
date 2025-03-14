const express = require("express");
const app = express();
const port = 7000;

const connectToDB = require("./config/database.js");

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the webpage" });
});

connectToDB()
  .then(() => {
    console.log("Connected to DB..!");
    app.listen(port, (req, res) => {
      console.log(`Connected to successfully on port ${port}`);
    });
  })
  .catch((err) => {
    `ERROR: ${err.message}`;
  });
