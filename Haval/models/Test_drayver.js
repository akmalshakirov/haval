const mongoose = require("mongoose");

const Test_drayver = new mongoose.Schema({
    toliqIsm: {type: String, required: true},
    model: {type: String, required: true},
    phone: {type: String, required: true, unique: true, match: /^\+998\d{9}$/},
    izoh: {type: String, required: true}
})

module.exports = mongoose.model("Test_drayver", Test_drayver);
