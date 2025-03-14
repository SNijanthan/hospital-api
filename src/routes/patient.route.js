const express = require("express");
const patientRouter = express.Router();

patientRouter.post("/patients/register", async (req, res) => {});

patientRouter.post("/patients/:id/create_report", async (req, res) => {});

patientRouter.get("/patients/:id/all_reports", async (req, res) => {});

module.exports = patientRouter;
