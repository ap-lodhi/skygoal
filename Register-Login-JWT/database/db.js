const mongoose = require("mongoose");

async function connectDb() {
  try {
    await mongoose.connect("mongodb://localhost:27017/oyesters");
    console.log("Successfully connected to DB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = connectDb;

