const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    model: { type: String },
    year: { type: Number },
    price: { type: Number },
    image: { type: String },
    role: { type: String, enum: ["admin", "user"], default: "admin" },
});

exports.Car = mongoose.model("Car", carSchema);
