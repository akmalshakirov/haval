const mongoose = require("mongoose");

const Video = new mongoose.Schema({
    title: {type: String},
    video: {type: String},
    createdAt: {type: String},
    updatedAt: {type: String}
})

module.exports = mongoose.model("Video", Video);