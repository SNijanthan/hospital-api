const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Patient",
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
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Doctor",
    },
  },
  { timestamps: true }
);

const ReportSchema = mongoose.model("Report", reportSchema);

module.exports = ReportSchema;
