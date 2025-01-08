const mongoose = require("mongoose");
require("dotenv").config();

exports.db = async function () {
  const url = process.env.MONGODB_URL;
  if (!url) {
    console.error("❌ MongoDB URL is not defined in environment variables!");
    process.exit(1);
  }

  let attempts = 0;
  const maxAttempts = 5;

  while (attempts < maxAttempts) {
    try {
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("✅ MongoDB connection successful!");
      break; 
    } catch (err) {
      attempts++;
      console.error(`❌ MongoDB connection failed (attempt ${attempts}):`, err);

      if (attempts === maxAttempts) {
        console.error("❌ Max connection attempts reached. Exiting...");
        process.exit(1);
      }
      await new Promise((resolve) => setTimeout(resolve, 5000)); // 5 soniya kutish
    }
  }
};
