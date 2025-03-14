const mongoose = require("mongoose");
const validator = require("validator");

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 50,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 1,
      maxLength: 50,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid..!");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 50,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("password is too weak.. Please change ");
        }
      },
    },
  },
  { timestamps: true }
);

const DoctorSchema = mongoose.model("Doctor", doctorSchema);

module.exports = DoctorSchema;
