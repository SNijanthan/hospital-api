const mongoose = require("mongoose");
require("dotenv").config();

const connectToDB = async () => {
  await mongoose.connect(process.env.URI);
};

module.exports = connectToDB;
