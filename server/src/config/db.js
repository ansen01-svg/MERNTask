const mongoose = require("mongoose");

const connectDb = async (mongoUri) => {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database:", error.message);
    process.exit(1);
  }
};

module.exports = connectDb;
