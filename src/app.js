const express = require("express");
const app = express();
const port = 7000;

const connectToDB = require("./config/database.js");

const doctorRouter = require("./routes/doctor.route.js");
const patientRouter = require("./routes/patient.route.js");

const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());

app.use("/", doctorRouter);
app.use("/", patientRouter);

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
