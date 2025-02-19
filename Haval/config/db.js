const mongoose = require("mongoose");
require("dotenv").config();
const { GridFSBucket } = require("mongodb");

let gfs;

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

      const conn = mongoose.connection;
      gfs = new GridFSBucket(conn.db, { bucketName: "pdfs" });

      console.log("✅ GridFS ulanishi muvaffaqiyatli!");
      return;
    } catch (err) {
      attempts++;
      console.error(`❌ MongoDB connection failed (attempt ${attempts}):`, err);

      if (attempts === maxAttempts) {
        console.error("❌ Max connection attempts reached. Exiting...");
        process.exit(1);
      }
      await new Promise((resolve) => setTimeout(resolve, 5000)); 
    }
  }
};

exports.getGFS = function () {
  if (!gfs) {
    throw new Error("GridFS hali bog'lanmagan! MongoDB ulanayotgan bo'lishi mumkin.");
  }
  return gfs;
};
