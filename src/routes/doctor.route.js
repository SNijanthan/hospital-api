const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const DoctorSchema = require("../models/doctors.model");
const { validateUser } = require("../utils/validation.js");

require("dotenv").config();

const doctorRouter = express.Router();

doctorRouter.post("/doctors/register", async (req, res) => {
  try {
    validateUser(req);

    const { name, emailId, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new DoctorSchema({
      name,
      emailId,
      password: hashPassword,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).json({ message: `Error: ${error.message}` });
  }
});

doctorRouter.post("/doctors/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const existingUser = await DoctorSchema.findOne({ emailId });

    if (!existingUser) {
      return res.status(400).json({ message: "Incorrect credentials" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      throw new Error("Incorrect credentials");
    }

    const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res
      .cookie("Token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: "Logged in successfully" });
  } catch (error) {
    res.status(400).json({ message: `Error: ${error.message}` });
  }
});

module.exports = doctorRouter;
