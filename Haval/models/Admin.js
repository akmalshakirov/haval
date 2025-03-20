const mongoose = require("mongoose");

const Admin = new mongoose.Schema({
    adminName: { type: String, },
    email: { type: String, unique: true },
    password: { type: String, },
    role: { type: String, enum: ["superadmin", "admin"], default: "admin" },
    status: { type: Boolean, default: true },
    lastLogin: { type: Date, default: Date.now },
},{ timestamps: true });

module.exports = mongoose.model("Admin", Admin);
