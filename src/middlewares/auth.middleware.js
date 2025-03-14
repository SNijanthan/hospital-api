const jwt = require("jsonwebtoken");

const DoctorSchema = require("../models/doctors.model");

const auth = async (req, res, next) => {
  try {
    const { Token } = req.cookies;

    if (!Token) {
      throw new Error("Session expired. Please login again...!");
    }

    const decodedToken = jwt.verify(Token, "JWT@123");

    const existingUser = await DoctorSchema.findById(decodedToken._id);

    if (!existingUser) {
      throw new Error(`Something went wrong, Please login again ..!`);
    }

    req.user = existingUser;

    next();
  } catch (error) {
    res.status(400).json({ message: `Error: ${error.message}` });
  }
};

module.exports = auth;
