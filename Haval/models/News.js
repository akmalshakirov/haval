const mongoose = require("mongoose")

const News = new mongoose.Schema({
    newsId: {type: mongoose.Schema.Types.ObjectId},
    title: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    createdAt: {type: String, required: true},
    updatedAt: {type: String}
})

module.exports = News;