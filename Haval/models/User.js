const mongoose = require("mongoose");

const User = new mongoose.Schema({
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    name: { type: String },
    email: { type: String },
    password: { type: String },
    role: [{ type: String, default: ["User"] }],
});

module.exports = mongoose.model("User", User);
