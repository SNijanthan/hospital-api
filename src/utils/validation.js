const validator = require("validator");

const validateUser = (req) => {
  const { name, emailId, password } = req.body;

  if (name.length === 0 || emailId.length === 0 || password.length === 0) {
    throw new Error("Fields cannot be empty and ");
  } else if (name.length > 50) {
    throw new Error("name cannot be more than 50 characters");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email format is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("password is too weak.. Try another password");
  }
};

module.exports = validateUser;
