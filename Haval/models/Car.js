const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    model: { type: String },
    year: { type: Number },
    price: { type: Number },
    images: { type: [String] },
    role: { type: String, enum: ["superadmin", "admin"], default: "admin" },
});

exports.Car = mongoose.model("Car", carSchema);
