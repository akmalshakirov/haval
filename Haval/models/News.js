const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    image: { type: String },
    role: { type: String, default: "admin" },
}, { timestamps: true }); 

module.exports = mongoose.model("News", NewsSchema);

