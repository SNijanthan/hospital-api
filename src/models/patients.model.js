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
    status: {
      type: String,
      required: true,
      enum: {
        values: [
          "Negative",
          "Travelled-Quarantine",
          "Symptoms-Quarantine",
          "Positive-Admit",
        ],
        message: `{VALUE} is not a valid status`,
      },
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Doctor",
    },
  },
  { timestamps: true }
);

const PatientSchema = mongoose.model("Patient", patientSchema);

module.exports = PatientSchema;
