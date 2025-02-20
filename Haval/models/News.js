const mongoose = require("mongoose");

const News = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    image: { type: String },
    createdAt: { type: String },
    updatedAt: { type: String },
    role: { type: String, default: "admin" },
});

module.exports = mongoose.model("News", News);
