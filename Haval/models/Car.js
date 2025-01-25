const { Schema, mongoose } = require("mongoose");

const Car = new mongoose.Schema({
    model: { type: String },
    title: { type: String },
    description: { type: String },
    year: { type: Number },
    price: { type: Number },
    image: { type: String },
    role: { type: String, default: "admin" },
});

module.exports = mongoose.model("Car", Car);
