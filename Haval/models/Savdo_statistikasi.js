const mongoose = require("mongoose");

const Savdo_statistikasi = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    createdAt: {type: String, required: true},
    updatedAt: {type: String}
})

module.exports = mongoose.model("Savdo_statistikasi", Savdo_statistikasi);
