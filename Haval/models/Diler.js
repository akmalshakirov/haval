const mongoose = require("mongoose");

const Diler = new mongoose.Schema({
    dilerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, },
    manzil: { type: String,},
    workHoursDays: {
        type: String,
        enum: ["du - yak", "du - shan", "du - ju", "yak - yak"],
        default: "du - yak",
    },
    workHoursStart: {
        type: String,
        match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
    },
    workHoursEnd: {
        type: String,
        match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
    },
    phone: {
        type: String,
        unique: true,
        match: /^\+998[0-9]{9}$/,
    },
    role: { type: String, enum: ["admin", "user"], default: "admin",},
});

module.exports = mongoose.model("Diler", Diler);
