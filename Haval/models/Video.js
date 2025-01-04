const mongoose = require("mongoose");

const Video = new mongoose.Schema({
    videoId: {type: mongoose.Schema.Types.ObjectId},
    title: {type: String, required: true},
    video: {type: String, required: true},
    createdAt: {type: String, required: true},
    updatedAt: {type: String}
})

module.exports = mongoose.model("Video", Video);