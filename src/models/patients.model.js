const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 50,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      minLength: 10,
      maxLength: 10,
      trim: true,
    },
  },
  { timestamps: true }
);

const PatientSchema = mongoose.model("Patient", patientSchema);

module.exports = PatientSchema;
