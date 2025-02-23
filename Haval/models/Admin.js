const mongoose = require("mongoose");

const Admin = new mongoose.Schema({
    adminName: { type: String, },
    email: { type: String, unique: true },
    password: { type: String, },
    role: { type: String, enum: ["superadmin", "admin"], default: "admin" },
    status: { type: Number, default: 0 },
    lastLogin: { type: Date, default: null },
});

module.exports = mongoose.model("Admin", Admin);
