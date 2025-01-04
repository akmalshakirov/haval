const mongoose = require("mongoose");

const Category = new mongoose.Schema({
    title: {type: String, required: true},
})

module.exports = mongoose.model("Category", Category);
