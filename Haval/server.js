const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const {db} = require("./config/db.js");
const dotenv = require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const router = require("./routes.js");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

db()

app.use(express.json());
app.use(cors({
  origin: "http://192.168.0.119",
  methods: ["POST", "GET"],
}));
app.use(helmet());


app.use('/', router)


app.listen(PORT, (rt) => {
  console.log(`Server ${PORT} portida ishga tushdi.`);
});
