const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth.middleware.js");

const DoctorSchema = require("../models/doctors.model");
const { validateUser } = require("../utils/validation.js");

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
      throw new Error("Incorrect credentials");
    }

    const isPassowrdValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPassowrdValid) {
      throw new Error("Incorrect credentials");
    }

    const token = jwt.sign({ _id: existingUser._id }, "JWT@123", {
      expiresIn: "1d",
    });

    res
      .cookie("Token", token)
      .status(200)
      .json({ message: "Logged in successfully" });
  } catch (error) {
    res.status(400).json({ message: `Error: ${error.message}` });
  }
});

module.exports = doctorRouter;
