const mongoose = require("mongoose");
const carSchema = new mongoose.Schema({
    model: { type: String },
    title: { type: String },
    description: { type: String },
    year: { type: Number },
    price: { type: Number },
    image: { type: String },
});

exports.Car = mongoose.model("Car", carSchema);
