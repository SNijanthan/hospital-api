const mongoose = require("mongoose");

const connectToDB = async () => {
  await mongoose.connect(
    "mongodb+srv://nijanthan378:eCBrsNQ2bq7wHCDz@hospitalapi.dffgl.mongodb.net/hospitalAPI"
  );
};

module.exports = connectToDB;
