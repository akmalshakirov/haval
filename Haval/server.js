const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { db, getGFS } = require("./config/db.js");
const cancelUnpaidOrders = require("./shartnoma/cron/cancelUnpaidOrders.js");
const dotenv = require("dotenv").config();

db()
  .then(() => {
    const gfs = getGFS();
    console.log("✅ GridFS tayyor!");
  })
  .catch((err) => console.error("❌ Ulanishda xatolik:", err));

const app = express();
const PORT = process.env.PORT || 5000;
const router = require("./routes.js");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/", router);

app.listen(PORT, (res) => {
  console.log(`🚀Server ${PORT} portida ishga tushdi.`);
});

cancelUnpaidOrders();
