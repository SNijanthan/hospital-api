const validator = require("validator");

const validateUser = (req) => {
  const { name, emailId, password } = req.body;

  if (name.length === 0 || emailId.length === 0 || password.length === 0) {
    throw new Error("Fields cannot be empty");
  } else if (name.length > 50) {
    throw new Error("name cannot be more than 50 characters");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email format is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("password is too weak.. Try another password");
  }
};

const validatePatient = (req) => {
  const { name, phoneNumber } = req.body;

  if (name.length === 0 || phoneNumber.length === 0) {
    throw new Error("Fields cannot be empty");
  }
  if (phoneNumber.length < 10) {
    throw new Error("Digits cannot be more than 10 numbers");
  }
};

module.exports = { validateUser, validatePatient };
