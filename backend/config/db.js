const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    // @ts-ignore
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected successfully...");
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectdb;
