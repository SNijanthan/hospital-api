const express = require("express");
const app = express();
const port = 7000;

const connectToDB = require("./config/database.js");

const doctorRouter = require("./routes/doctor.route.js");
const patientRouter = require("./routes/patient.route.js");
const reportRouter = require("./routes/report.route.js");

const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());

app.use("/doctors", doctorRouter);
app.use("/patients", patientRouter);
app.use("/reports", reportRouter);

connectToDB()
  .then(() => {
    console.log("Connected to DB..!");
    app.listen(port, () => {
      console.log(`Connected to successfully on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(`ERROR: ${err.message}`);
  });
