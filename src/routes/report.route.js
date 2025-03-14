const express = require("express");

const auth = require("../middlewares/auth.middleware");
const ReportSchema = require("../models/report.model");

const reportRouter = express.Router();

reportRouter.get("/reports/:status", auth, async (req, res) => {
  try {
    const { status } = req.params;

    const users = await ReportSchema.find({ status })
      .select("status createdAt")
      .populate("patient", "name")
      .populate("createdBy", "name")
      .sort({ createdAt: 1 });

    if (!users) {
      throw new Error("Users not found");
    }

    res.status(200).json({ message: "Data retrieved successfully", users });
  } catch (error) {
    res.status(400).json({ message: `Error: ${error.message}` });
  }
});

module.exports = reportRouter;
