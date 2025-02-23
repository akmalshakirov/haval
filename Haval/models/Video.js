const mongoose = require("mongoose");

const Video = new mongoose.Schema({
    title: {type: String},
    video: {type: String},
    role: { type: String, default: "admin" },
}, { timestamps: true })

module.exports = mongoose.model("Video", Video);