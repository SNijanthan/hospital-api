const express = require("express");
const patientRouter = express.Router();

const auth = require("../middlewares/auth.middleware");

const PatientSchema = require("../models/patients.model");
const ReportSchema = require("../models/report.model");
const { validatePatient } = require("../utils/validation.js");

patientRouter.post("/patients/register", auth, async (req, res) => {
  try {
    validatePatient(req);

    const { name, phoneNumber } = req.body;

    const existingUser = await PatientSchema.findOne({ phoneNumber });

    if (existingUser) {
      return res.status(200).json({
        message: "User already exists",
        patient: {
          _id: existingUser._id,
          name: existingUser.name,
          phoneNumber: existingUser.phoneNumber,
        },
      });
    }

    const user = new PatientSchema({ name, phoneNumber });

    await user.save();

    res.status(201).json({ message: "patient registered successfully", user });
  } catch (error) {
    res.status(400).json({ message: `Error: ${error.message}` });
  }
});

patientRouter.post("/patients/:id/create_report", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const { status } = req.body;

    const loggedInUser = req.user;

    const user = await PatientSchema.findById(id);

    if (!user) {
      throw new Error("patient does not exist");
    }

    const report = new ReportSchema({
      patient: user._id,
      status,
      createdBy: loggedInUser._id,
    });

    await report.save();

    res.status(201).json({ message: "Report created successfully", report });
  } catch (error) {
    res.status(400).json({ message: `Error: ${error.message}` });
  }
});

patientRouter.get("/patients/:id/all_reports", auth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const { id } = req.params;

    const existingUser = await PatientSchema.findById(id);

    if (!existingUser) {
      throw new Error("patient does not exist");
    }

    const allReports = await ReportSchema.find({ patient: id })
      .select("status createdAt")
      .populate("patient", "name phoneNumber")
      .populate("createdBy", "name emailId")
      .sort({ createdAt: 1 });

    res
      .status(200)
      .json({ mesage: "Reports retrieved successfully", data: allReports });
  } catch (error) {
    res.status(400).json({ message: `Error: ${error.message}` });
  }
});



module.exports = patientRouter;
