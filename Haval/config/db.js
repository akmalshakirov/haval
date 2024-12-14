const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

  exports.db = async function () {
    // const url = process.env.MONGOB_URL;

    const url = `mongodb+srv://kumushizziyeva:Kumush1@haval.r9fhk.mongodb.net/?retryWrites=true&w=majority&appName=Haval`
    await mongoose
      .connect(url, {})
      .then(() => {
        console.log("Mongodb connect succsesfull");
      })
      .catch((err) => {
        console.log(err);
      });
  };