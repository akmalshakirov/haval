const mongoose = require("mongoose");

const Savdo_statistikasi = new mongoose.Schema({
    title: {type: String, },
    description: {type: String, },
    image: {type: String, },
    role: { type: String, default: "admin" },
}, { timestamps: true }); 

module.exports = mongoose.model("Savdo_statistikasi", Savdo_statistikasi);
